import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FontAwesomeIconColorBoolPair} from '../../models';
import {Observable} from "rxjs";

@Component({
  selector: 'gll-dialog-wrapper',
  template: `
      <div>
          <div class="modal-header">
              <h4 class="modal-title" id="modal-basic-title">
                <span [ngStyle]="{'color': iconColorPair?.color}" class="material-icons-outlined">{{iconColorPair?.icon}}</span>
                  {{title}}
              </h4>
          </div>
          <div class="modal-body">
              <ng-content></ng-content>
          </div>
        <div *ngIf="showCloseButton" class="modal-footer">
          <button (click)="closeButtonClick.emit(true)" class="btn btn-outline-secondary">Close</button> <!--todo translate 'Close' label-->
        </div>
      </div>
  `,
})
export class DialogWrapperComponent {
  @Input() title: string;
  @Input() showCloseButton: boolean = false;
  @Input() iconColorPair: FontAwesomeIconColorBoolPair;
  @Output() closeButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>();

}

