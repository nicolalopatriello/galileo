import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class GllBaseAuthTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  protected abstract getLocalStorageAuthTokenInfo(): { tokenKey: string, refreshTokenKey: string }

  protected abstract ifErrorsAction(): void;

  protected abstract refreshTokenRequest(): Observable<{ newToken: string, newRefreshToken: string }>

  protected abstract appendHeaders(): { [name: string]: string | string[]; }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.readTokenFromLocalStorage();
    if (!!token) {
      request = this.addToken(request, token);
    }
    request = this.addOptionalHeaders(request);
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(err);
        }
      }));

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.refreshTokenRequest().pipe(
        switchMap((resp: { newToken: string, newRefreshToken: string }) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(resp.newToken);
          localStorage.setItem(this.getLocalStorageAuthTokenInfo().tokenKey, resp.newToken);
          localStorage.setItem(this.getLocalStorageAuthTokenInfo().refreshTokenKey, resp.newRefreshToken);
          return next.handle(this.addToken(request, resp.newToken));
        })).pipe(
        catchError(err => {
          this.isRefreshing = false;
          this.ifErrorsAction();
          return throwError(err);
        })
      );

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

  private addToken(request: HttpRequest<any>, token?: string) {
    return request.clone({
      setHeaders: {
        Authorization: token
      }
    });
  }

  private addOptionalHeaders(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        ...this.appendHeaders(),
      }
    });
  }

  private readTokenFromLocalStorage(): string {
    return localStorage.getItem(this.getLocalStorageAuthTokenInfo().tokenKey);
  }

}

