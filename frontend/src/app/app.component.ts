import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { Observable } from 'rxjs';
import { CurrentUserService } from './services/current_user/current-user.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  is_auth: boolean = false;
  constructor(
    private authService: NbAuthService,
    private currentUser: CurrentUserService,
    private router: Router
  ) {}
  title = 'frontend';

  items: NbMenuItem[] = [
    {
      title: 'STRONA GŁÓWNA',
      link: '/home',
    },
    {
      title: 'KALENDARZ',
      link: '/calendar',
    },
    {
      title: 'DRUŻYNY',
      link: '/teams',
    },
    {
      title: 'STATYSTYKI',
      link: '/statistics',
    },

    {
      title: 'PROFIL',
      link: '/profile',
    },
  ];
  check_auth() {
    this.authService
      .isAuthenticated()
      .subscribe((result) => (this.is_auth = result));
    if (!this.is_auth) {
      this.currentUser.logout();
    }
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url != '/register') {
          this.check_auth();
        }
      }
    });
  }
  logout() {
    this.currentUser.logout();
  }
}
