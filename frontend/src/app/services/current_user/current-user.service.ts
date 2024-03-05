import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  NbAuthOAuth2JWTToken,
  NbAuthService,
  NbAuthToken,
} from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  constructor(private authService: NbAuthService, private router: Router) {}

  getUserUUID(): Observable<any> {
    return this.getFromPayload('user_uuid').pipe(map((user_uuid) => user_uuid));
  }

  getUser(): Observable<Partial<User>> {
    return this.getFromPayload('user').pipe(map((user) => user));
  }

  //TODO: CLEANER CLASS do sprzątanie wszystkich cache podczas wylogowywania
  logout(params?: any) {
    this.clearCache();
    this.authService.logout('email').subscribe();
    this.router.navigate(['login'], { queryParams: params });
  }

  clearCache() {}

  getPerms(): Observable<string[]> {
    return this.getFromPayload('permissions').pipe(map((perms) => perms));
  }

  private getFromPayload(key: string): Observable<any> {
    return this.authService.getToken().pipe(
      map((token: any) => {
        try {
          return token.getAccessTokenPayload()[key];
        } catch {
          this.logout();
        }
      })
    );
  }
}
