import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gll-filter-icon',
  template: `
    <div>
<span style="vertical-align: middle" [ngStyle]="{'font-size': fontSize + 'px'}" class="material-icons-outlined">filter_alt</span>
    </div>
  `,
})
export class FilterIconComponent {
  @Input() fontSize = 16;
}
