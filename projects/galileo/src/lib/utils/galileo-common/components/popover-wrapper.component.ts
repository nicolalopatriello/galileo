import {Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {PlacementArray} from '@ng-bootstrap/ng-bootstrap/util/positioning';

@Component({
  selector: 'gll-popover-wrapper',
  template: `
    <div [ngbPopover]="template" container="body" [placement]="placement" style="z-index: 9999">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class PopoverWrapperComponent {
  template: TemplateRef<any>;
  placement: PlacementArray;

  @ViewChild(NgbPopover, {static: true}) popover: NgbPopover;


}

@Component({
  template: `
  <div #elem class="gll-popover-layer" style="position: absolute; top: 0; left: 0;width: 100%; height: 100vh; background: black; opacity: .5; z-index: 9; pointer-events: none">
  </div>
  `
})
export class PopoverLayerComponent  {
  @ViewChild('elem') elem: ElementRef;

}
