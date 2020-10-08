import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'gll-form',
  template: `
    <div>
      <ng-content></ng-content>
      <div class="w-100 d-flex" [ngClass]="{'justify-content-start': buttonsPosition === 'left',
          'justify-content-center': buttonsPosition === 'center', 'justify-content-end': buttonsPosition === 'right'
          }">
        <button *ngIf="showBuiltInButtons" [disabled]="!relativeFormGroup.valid" (click)="confirm.emit(true)"
                class="btn btn-primary mr-1">{{'confirm' | galileoTranslate | async}}
        </button>
        <button *ngIf="showBuiltInButtons" (click)="resetForm(); reject.emit(true)"
                class="btn btn-outline-secondary ml-1">{{'cancel' | galileoTranslate | async}}
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class FormComponent {

  @Input() buttonsPosition: 'left' | 'center' | 'right' = 'right';
  @Input() relativeFormGroup: FormGroup;
  @Input() showBuiltInButtons: boolean = true;
  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() reject: EventEmitter<boolean> = new EventEmitter<boolean>();


  resetForm() {
    this.relativeFormGroup.reset();
    this.relativeFormGroup.markAsUntouched();
  }

}
