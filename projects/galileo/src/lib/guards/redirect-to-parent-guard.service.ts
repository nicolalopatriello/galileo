import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, NavigationEnd, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { filter, map, pluck, take, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedirectToParentGuard implements CanActivate, OnDestroy {
  constructor(private router: Router) {
  }

  private destroy$: Subject<boolean> = new Subject<boolean>();

  canActivate(): Observable<boolean> {
    this.router.events.pipe(filter(ev => ev instanceof NavigationEnd),
      pluck('url'),
      take(1),
      map(url => url.toString().split('/')),
      filter(urlBucket => !!urlBucket && urlBucket.length > 0),
      takeUntil(this.destroy$)
    ).subscribe(buckets => {
      const pathWithHop = buckets.slice(0, -Math.abs(1)).filter(t => t.length > 0);
      this.router.navigate(pathWithHop);
    });
    return of(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
