import {Component, Input} from '@angular/core';

@Component({
  selector: 'gll-simple-card',
  styleUrls: ['./simple-card.component.scss'],
  template: `
    <div class="card gll-simple-card"
         [ngStyle]="{'height': heightPx, 'background': backgroundColor ? backgroundColor : null}">
      <div class="card-body d-flex justify-content-between align-items-start w-100">
        <div class="w-100">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class SimpleCardComponent {

  @Input() heightPx: number;
  @Input() backgroundColor: string;
}
