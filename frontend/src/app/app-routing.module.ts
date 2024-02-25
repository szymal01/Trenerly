import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component'; // Importuj komponenty podstron
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { CalendarComponent } from './component/calendar/calendar.component';
import { TeamsComponent } from './component/teams/teams.component';
import { MessagesComponent } from './component/messages/messages.component';
import { ProfileComponent } from './component/profile/profile.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { StatuteComponent } from './component/statute/statute.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Strona główna
  { path: 'login', component: LoginComponent }, // Strona logowania
  { path: 'register', component: RegisterComponent }, // Strona rejestracji
  { path: 'calendar', component: CalendarComponent }, // Strona kalendarza
  { path: 'teams', component: TeamsComponent }, // Strona widoku drużyn
  { path: 'messages', component: MessagesComponent }, // Strona widoku wiadomości
  { path: 'statistics', component: StatisticsComponent }, //Strona widoku statystyk
  { path: 'profile', component: ProfileComponent }, //Strona profilowa
  { path: 'statute', component: StatuteComponent }, //Strona widoku regulaminy i polityki prywatności
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
