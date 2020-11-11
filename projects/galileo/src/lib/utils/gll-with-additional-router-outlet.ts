import {ElementRef, Renderer2} from '@angular/core';
import {Subject} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map, pluck} from 'rxjs/operators';

export abstract class WithAdditionalRouterOutlet {
  private childElements: any[] = [];
  private toggleSubject: Subject<boolean> = new Subject<boolean>();

  protected abstract getContainerViewChild(): ElementRef;

  protected abstract getUrlBreakPoint(): string;


  constructor(public router: Router, public renderer2: Renderer2) {
    this.toggleSubject.subscribe(t => {
      if (t) {
        this.show();
      } else {
        this.hide();
      }
    });
    this.firstRun();

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      pluck('url'),
      map(url => url.toString().split('/')),
      filter(urlBucket => !!urlBucket && urlBucket.length > 0)
    ).subscribe(buckets => {
      const idx = buckets.findIndex(t => this.getUrlBreakPoint() === t);
      if (!!buckets[idx + 1]) {
        this.toggleSubject.next(false);
      } else {
        this.toggleSubject.next(true);
      }
    });

  }

  private firstRun() {
    const buckets = window.location.href.split('/').filter(bucket => !!bucket && bucket.length > 0);
    const idx = buckets.findIndex(t => this.getUrlBreakPoint() === t);
    if (!!buckets[idx + 1]) {
      this.toggleSubject.next(false);
    } else {
      this.toggleSubject.next(true);
    }
  }

  private hide() {
    if (!!this.getContainerViewChild()) {
      Array.from(this.getContainerViewChild().nativeElement.children).forEach(child => {
        this.childElements.push(child);
        this.renderer2.removeChild(this.getContainerViewChild().nativeElement, child);
      });
    } else {
      // this to avoid first run not initialized template
      setTimeout(() => this.toggleSubject.next(false), 100);
    }
  }

  private show() {
    if (!!this.getContainerViewChild()) {
      Array.from(this.childElements).forEach(el => {
        this.renderer2.appendChild(this.getContainerViewChild().nativeElement, el);
      });
      this.childElements = [];
    } else {
      // this to avoid first run not initialized template
      setTimeout(() => this.toggleSubject.next(true), 100);
    }
  }
}
