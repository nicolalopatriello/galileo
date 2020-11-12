import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {filter, map, pluck, takeUntil} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';

@Directive({
  selector: '[gllHideIfHasChildRoutes]'
})
export class HideIfHasChildRoutesDirective implements OnInit, OnDestroy {

  /**
   * lsicpHideIfHasChildRoutes is used as breakpoint to check if below this
   * route exists childs. It must be defined.
   * */
  @Input() gllHideIfHasChildRoutes: string;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private templateRef: TemplateRef<any>,
              private router: Router,
              private viewContainer: ViewContainerRef) {
  }

  ngOnInit(): void {
    if (!this.gllHideIfHasChildRoutes?.length) {
      throw Error('Invalid lsicpHideIfHasChildRoutes. You must provide a valid \'url\' breakpoint');
    } else {
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        pluck('url'),
        map(url => url.toString().split('/')),
        filter(urlBucket => !!urlBucket && urlBucket.length > 0),
        takeUntil(this.destroy$)
      ).subscribe(buckets => {
        const idx = buckets.findIndex(t => this.gllHideIfHasChildRoutes === t);
        if (!!buckets[idx + 1]) {
          this.viewContainer.clear();
        } else {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
