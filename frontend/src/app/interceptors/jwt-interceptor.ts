import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = JSON.parse(localStorage.getItem('auth_app_token') || '{}');
    if (Object.keys(token).length === 0) {
      return next.handle(req);
    } else {
      const token_data = JSON.parse(token.value);
      const cloned = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + token_data.access_token
        ),
      });

      return next.handle(cloned);
    }
  }
}
