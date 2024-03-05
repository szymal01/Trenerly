import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  BehaviorSubject,
} from 'rxjs';
import { NbAuthOAuth2JWTToken, NbAuthService } from '@nebular/auth';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CurrentUserService } from '../services/current_user/current-user.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private currentUserService: CurrentUserService,
    public auth: NbAuthService,
    private router: Router,
    private location: Location
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        // We don't want to refresh token for some requests like login or refresh token itself
        // So we verify url and we throw an error if it's the case
        if (
          // request.url.includes("password_reset") ||
          request.url.includes('refresh-token') ||
          request.url.includes('token')
          //this.permGuard.refreshTokenInProgress
        ) {
          // We do another check to see if refresh token failed
          // In this case we want to logout user and to redirect it to login page

          if (request.url.includes('refresh-token')) {
            if (error.status === 401) {
              this.currentUserService.logout();
            }
          }

          return throwError(() => error);
        }

        // If error status is different than 401 we want to skip refresh token
        // So we check that and throw the error if it's the case
        if (error.status !== 401) {
          if (error.status == 403) {
            this.location.back();
          }
          return throwError(() => error);
        }

        if (this.refreshTokenInProgress) {
          // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
          // – which means the new token is ready and we can retry the request again
          return this.refreshTokenSubject.pipe(
            filter((result) => result !== null),
            take(1),
            switchMap(() => next.handle(this.addAuthenticationToken(request)))
          );
        } else {
          this.refreshTokenInProgress = true;

          // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
          this.refreshTokenSubject.next(null);

          // Call auth.refreshAccessToken(this is an Observable that will be returned)
          let jwt_token;
          this.auth.getToken().subscribe((token) => (jwt_token = token));
          return this.auth.refreshToken('email', jwt_token).pipe(
            switchMap((token: any) => {
              //When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              this.refreshTokenInProgress = false;
              this.refreshTokenSubject.next(token);

              return next.handle(this.addAuthenticationToken(request));
            }),
            catchError((err: any) => {
              this.refreshTokenInProgress = false;

              this.auth.logout('email');
              return throwError(() => error);
            })
          );
        }
      })
    );
  }

  addAuthenticationToken(request: HttpRequest<any>) {
    // Get access token from Local Storage
    const accessToken = this.auth.getToken();

    // If access token is null this means that user is not logged in
    // And we return the original request
    if (!accessToken) {
      return request;
    }

    // We clone the request, because the original request is immutable

    const token = JSON.parse(localStorage.getItem('auth_app_token') || '{}');
    if (token) {
      const token_data = JSON.parse(token.value);
      const cloned = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + token_data.access_token
        ),
      });
      return cloned;
    }
    return request;
  }
}
