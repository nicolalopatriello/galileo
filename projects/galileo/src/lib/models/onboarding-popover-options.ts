import {ElementRef, TemplateRef} from '@angular/core';
import {PlacementArray} from '@ng-bootstrap/ng-bootstrap/util/positioning';

export interface OnboardingPopoverOptions {
  where: any;
  what: TemplateRef<any>;
  placement?: PlacementArray;
}
