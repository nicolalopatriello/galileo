import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogType, FontAwesomeIconColorBoolPair} from '../../../models';

@Component({
  selector: 'gll-confirm-dialog',
  template: `
    <div class="modal-header bg-success text-light" [ngClass]="{'bg-danger': dialogType == DialogType.ERROR}">
      <h4 class="modal-title" [ngClass]="{'text-white': dialogType === DialogType.ERROR}">
        <fa-icon *ngIf="iconColorPair" [icon]="['fas', iconColorPair.icon]"
                 [ngStyle]="{'color': iconColorPair.color}"></fa-icon>
        {{title}}</h4>
    </div>
    <div class="modal-body">
      <p>{{body}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary btn-default"
              (click)="activeModal.close()">
        {{confirmButtonLabel}}
      </button>
      <button *ngIf="showCancelButton" ngbAutofocus
              type="button" class="btn btn-outline-secondary"
              (click)="activeModal.dismiss()">
        {{'cancel' | galileoTranslate}}
      </button>
    </div>
  `,
  styles: []
})
export class ConfirmDialogComponent {

  @Input() title: string;
  @Input() showCancelButton: boolean;
  @Input() confirmButtonLabel: string;
  @Input() iconColorPair: FontAwesomeIconColorBoolPair;
  @Input() body: string;
  @Input() dialogType?: DialogType;

  DialogType = DialogType;

  constructor(public activeModal: NgbActiveModal) {
  }

}
