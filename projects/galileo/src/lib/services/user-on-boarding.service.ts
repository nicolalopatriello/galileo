import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OnboardingPopoverOptions} from '../models';
import {Subject} from 'rxjs';
import {
  PopoverLayerComponent,
  PopoverWrapperComponent
} from '../utils/galileo-common/components/popover-wrapper.component';

@Injectable({
  providedIn: 'root'
})
export class UserOnBoardingService {

  private popoverHelpSubject: Subject<OnboardingPopoverOptions> = new Subject<OnboardingPopoverOptions>();

  private currentElem: any;

  constructor(private modalService: NgbModal,
              private resolver: ComponentFactoryResolver,
              private injector: Injector,
              private appRef: ApplicationRef
  ) {
    this.popoverHelpSubject.subscribe(t => {
      this.renderPopover(t);
    });
  }


  public showPopover = (options: OnboardingPopoverOptions) => {
    this.popoverHelpSubject.next(options);
  }

  private removeBg() {
    const i = document.querySelector('.gll-popover-layer');
    if (!!i) {
      i.remove();
    }
  }

  private addZIndex(el: any) {
    if (!!el) {
      el.style.zIndex = '99';
    }
  }

  private removeZIndex(el: any) {
    if (!!el) {
      el.style.zIndex = '1';
    }
  }

  resetUserOnBoarding() {
    this.removeBg();
    this.removeZIndex(this.currentElem);
  }

  private renderPopover = (options: OnboardingPopoverOptions) => {
    this.removeBg();
    this.removeZIndex(this.currentElem);

    const popoverLayerFactory = this.resolver.resolveComponentFactory(PopoverLayerComponent);
    const popoverFactory = this.resolver.resolveComponentFactory(PopoverWrapperComponent);
    let projectableNodes = [];

    if (!!options.where.nativeElement) {
      projectableNodes = Array.from(options.where.nativeElement.childNodes);
    }

    if (!!options.where.childNodes) {
      projectableNodes = Array.from(options.where.childNodes);
    }

    if (projectableNodes.length === 0) {
      throw new Error('No projectableNodes found');
    }

    this.currentElem = options.where.nativeElement;
    this.addZIndex(this.currentElem);

    const compRef = popoverFactory.create(this.injector, [projectableNodes], this.currentElem);
    const layerRef = popoverLayerFactory.create(this.injector);

    compRef.instance.template = options.what;
    compRef.instance.placement = !!options.placement ? options.placement : 'auto';
    this.appRef.attachView(compRef.hostView);
    this.appRef.attachView(layerRef.hostView);

    const domElem = (layerRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    setTimeout(_ => compRef.instance.popover.open(), 250);
  }

}


