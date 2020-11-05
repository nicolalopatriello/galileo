import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FontAwesomeIconColorBoolPair} from '../../models';
import {Observable} from "rxjs";

@Component({
  selector: 'gll-dialog-wrapper',
  template: `
      <div>
          <div class="modal-header">
              <h4 class="modal-title" id="modal-basic-title">
                  <fa-icon *ngIf="iconColorPair" [icon]="['fas', iconColorPair.icon]"
                           [ngStyle]="{'color': iconColorPair.color}"></fa-icon>
                  {{isObs(title) ? (title | async) : title}}
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
  styles: []
})
export class DialogWrapperComponent {
  @Input() title: string | Observable<string>;
  @Input() showCloseButton: boolean = false;
  @Input() iconColorPair: FontAwesomeIconColorBoolPair;

  @Output() closeButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  isObs(title: string | Observable<string>) {
    return !!title && title instanceof Observable;
  }

}

