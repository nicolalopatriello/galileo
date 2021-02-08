import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogOptions, DialogType, FontAwesomeIconColorBoolPair} from '../../../models';
import {Observable} from 'rxjs';
import {Utils} from '../../utils';

@Component({
  selector: 'gll-confirm-dialog',
  template: `
    <div class="modal-header text-light" [ngClass]="{'bg-danger': options?.dialogType == DialogType.DANGER, 'bg-success': options?.dialogType == DialogType.SUCCESS}">
      <h4 class="modal-title" [ngClass]="{'text-white': options?.dialogType === DialogType.DANGER}">
        <fa-icon *ngIf="options?.iconColorPair" [icon]="['fas', options?.iconColorPair.icon]"
                 [ngStyle]="{'color': options?.iconColorPair.color}"></fa-icon>
        {{isObs(options?.title) ? (options?.title | async) : options?.title}}</h4>
    </div>
    <div class="modal-body">
      <p>{{isObs(options?.body) ? (options?.body | async) : options?.body}}</p>
      <div *ngIf="options?.confirmButtonCheck">
        {{'toConfirmWrite' | galileoTranslate | async}} <span class="font-weight-bold">{{isObs(options?.confirmButtonCheck) ? (options?.confirmButtonCheck | async) : options?.confirmButtonCheck}}</span>:
        <input data-cy="confirmButtonCheck" [(ngModel)]="confirmButtonCheckInput" ngbAutofocus class="form-control" type="text">
      </div>
    </div>
    <div class="modal-footer">
      <button *ngIf="options?.dismissButtonLabel" ngbAutofocus
              type="button" class="btn btn-outline-secondary"
              (click)="activeModal.close(options?.dismissButtonLabel)">
        {{isObs(options?.dismissButtonLabel) ? (options?.dismissButtonLabel | async) : options?.dismissButtonLabel}}
      </button>
      <button type="button" class="btn btn-primary btn-default"
              [ngClass]="{'btn-success': options?.dialogType == DialogType.SUCCESS, 'btn-danger': options?.dialogType == DialogType.DANGER}"
              [disabled]="options?.confirmButtonCheck && confirmButtonCheckInput !== options?.confirmButtonCheck"
              (click)="activeModal.close(options?.confirmButtonLabel)">
        {{isObs(options?.confirmButtonLabel) ? (options?.confirmButtonLabel | async) : options?.confirmButtonLabel}}
      </button>
    </div>
  `,
  styles: []
})
export class ConfirmDialogComponent {

  @Input() options: ConfirmDialogOptions;

  DialogType = DialogType;
  public confirmButtonCheckInput: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  isObs(label: string | Observable<string>) {
    return Utils.isObs<string>(label);
  }

}
