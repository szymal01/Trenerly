import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentUserService } from '../current_user/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class AccessCheckerService {
  constructor(private currentUserService: CurrentUserService) {}

  hasPerm(perms: string[]): Observable<boolean> {
    return this.currentUserService.getPerms().pipe(
      map((userPerms: string[]) => {
        for (let perm of perms) {
          if (!userPerms || !userPerms.includes(perm)) {
            return false;
          }
        }
        return true;
      })
    );
  }

  filterMenu(menu: any[]): any[] {
    let initial = menu;
    for (let item of menu) {
      if (item.children) {
        this.filterMenu(item.children);
        if (item.children.length == 0) {
          menu.splice(menu.indexOf(item), 1);
          this.filterMenu(initial);
        }
      }

      if (item.data && item.data.perms) {
        this.hasPerm(item.data.perms).subscribe((hasPerm: boolean) => {
          if (!hasPerm) {
            menu.splice(menu.indexOf(item), 1);
            this.filterMenu(initial);
          }
        });
      }
    }
    return menu;
  }
}
