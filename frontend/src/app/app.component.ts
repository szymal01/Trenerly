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
      title: 'WIADOMOŚCI',
      link: '/messages',
    },
    {
      title: 'STATYSTYKI',
      link: '/statistics',
    },
    {
      title: 'PROFIL',
      children: [
        {
          title: 'Mój profil',
          link: '/profile',
        },
        {
          title: 'Logowanie',
          link: '/login',
        },
        {
          title: 'Rejestracja',
          link: '/register',
        },
        {
          title: 'Wyloguj',
        },
      ],
    },
  ];
  ngOnInit(): void {}
}
