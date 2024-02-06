import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Importuj komponenty podstron
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TeamsComponent } from './teams/teams.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StatuteComponent } from './statute/statute.component';

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
