import {AfterViewInit, Component, ElementRef, Input, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {Utils} from '../../utils/utils';
import {GalileoPopover} from '../../models';

@Component({
  selector: 'gll-input',
  template: `
    <div>
      <div [ngClass]="{'d-flex flex-row justify-content-around': inputLabelPosition === 'left'}">
        <label id="label-container" #inputLabel [ngClass]="{'label-left-position': inputLabelPosition === 'left'}"
               *ngIf="label">{{isObs(label) ? (label | async) : label}}
          <ng-container *ngIf="popoverHelp">
            <fa-icon class="cursor-pointer" [ngbPopover]="popoverContainer" [icon]="['far', 'question-circle']"></fa-icon>
            <ng-template #popoverContainer>
              <div class="p-1">
                {{popoverHelp.message}}
              </div>
              <div class="w-100 d-flex flex-row justify-content-end" *ngIf="popoverHelp.showGotItButton">
                <button class="btn-outline-primary btn btn-sm">
                  {{'gotIt' | galileoTranslate | async}}
                </button>
              </div>
            </ng-template>
          </ng-container>
        </label>
        <div id="input-container" #input [ngClass]="{'input-container-left-position': inputLabelPosition === 'left'}">
          <ng-content></ng-content>
        </div>
      </div>

      <div style="min-height: 25px">
        <div class="m-0 p-0">
          <ng-container *ngFor="let m of getMsgsKeys()">
            <small [ngClass]="{'msg-error-left-position': inputLabelPosition === 'left'}"
                   *ngIf="getErrorMessage(m) !== null"
                   class="text-danger">{{getErrorMessage(m)}}</small>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [
      `
      .msg-error-left-position {
        width: 70%;
        float: right;
        text-align: center;
        margin-top: 3px;
      }

      .label-left-position {
        margin-top: 7px;
        float: left;
        width: 30%;
        /* margin-right: 10px;*/
      }

      .input-container-left-position {
        width: 70%;
        float: right;
      }
    `
  ]
})
export class InputComponent implements AfterViewInit, OnDestroy {

  @ViewChild('input') input: ElementRef;
  @ViewChild('inputLabel') inputLabel: ElementRef;

  @Input() label: string | Observable<string>;
  @Input() inputLabelPosition: inputLabelPosition = 'top';
  @Input() associatedFormGroup: FormGroup;
  @Input() errorsMessages: object;
  @Input() fallBackFormControlName: string; // used if formControlName is not found (e.g when [formControlName] instead of formControlName is used
  @Input() popoverHelp: GalileoPopover = null;

  private formControlName: string = null;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private renderer2: Renderer2) {
  }

  ngAfterViewInit(): void {
    const i = this.input.nativeElement
      .querySelector('#input-container [formControlName]')?.getAttribute('formControlName');
    if (!!i) {
      this.formControlName = i;
      this.renderer2.setAttribute(this.inputLabel.nativeElement, 'for', i);
    } else {
      this.formControlName = this.fallBackFormControlName;
      this.renderer2.setAttribute(this.inputLabel.nativeElement, 'for', this.fallBackFormControlName);
    }
  }

  getErrorMessage(k: string): string {
    if (!!this.formControlName && !!this.associatedFormGroup && this.associatedFormGroup.get(this.formControlName)?.dirty) {
      return this.associatedFormGroup.get(this.formControlName).hasError(k) ? this.errorsMessages[k] : null;
    } else {
      return null;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  getMsgsKeys() {
    if (!!this.errorsMessages) {
      return Object.keys(this.errorsMessages);
    }
  }

  isObs(label: string | Observable<string>) {
    return Utils.isObs<string>(label);
  }
}

export type inputLabelPosition = 'top' | 'left';
