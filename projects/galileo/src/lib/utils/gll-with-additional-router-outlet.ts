import {ActivatedRoute} from '@angular/router';

export abstract class GllWithAdditionalRouterOutlet {

  protected constructor(public activatedRoute: ActivatedRoute) {
  }

  public withoutChildren() {
    return this.activatedRoute.children.length === 0;
  }
}
