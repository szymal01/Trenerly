import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  CanLoad,
  UrlSegment,
  Route,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AccessCheckerService } from '../services/access_checker/access-checker.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate, CanActivateChild, CanLoad {
  public refreshTokenInProgress = false;
  public refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private location: Location,
    private accessChecker: AccessCheckerService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkUserPermissions(next, state);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(next, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.checkUserPermissions(route);
  }

  checkUserPermissions(
    route: ActivatedRouteSnapshot | Route,
    state?: RouterStateSnapshot
  ): boolean {
    let canGo: boolean = true;
    console.log('sdsadsads');
    if (route.data!['required_perms']) {
      let required_perms = route.data!['required_perms'];
      this.accessChecker
        .hasPerm(required_perms)
        .subscribe((hasPerm: boolean) => {
          if (hasPerm) canGo = true;
          else {
            this.location.back();
            canGo = false;
          }
        });
    }
    return canGo;
  }
}
