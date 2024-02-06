import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  items: NbMenuItem[] = [
    {
      title: 'HOME',
      link: '/home',
    },
    {
      title: 'CALENDAR',
      link: '/calendar',
    },
    {
      title: 'TEAMS',
      link: '/teams',
    },
    {
      title: 'MESSAGES',
      link: '/messages',
    },
    {
      title: 'STATISTICS',
      link: '/statistics',
    },
    {
      title: 'PROFILE',
      children: [
        {
          title: 'Your Profile',
          link: '/profile',
        },
        {
          title: 'Login',
          link: '/login',
        },
        {
          title: 'Register',
          link: '/register',
        },
        {
          title: 'Logout',
        },
      ],
    },
  ];
  ngOnInit(): void {}
}
