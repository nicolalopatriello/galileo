import { Component, ElementRef, HostBinding } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'th[resizable]',
  template: `
    <div class="wrapper">
      <div class="content">
        <ng-content></ng-content>
      </div>
      <div class="gll-resizable-handle" (resizable)="onResize($event)"></div>
    </div>
  `,
  styleUrls: ['./resizable.component.scss'],
})
export class ResizableComponent {
  @HostBinding('style.width.px')
  width: number | null = null;

  onResize(width: number) {
    this.width = width;
  }
}
