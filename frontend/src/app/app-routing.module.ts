import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component'; // Importuj komponenty podstron
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { CalendarComponent } from './component/calendar/calendar.component';
import { TeamsComponent } from './component/teams/teams.component';
import { ProfileComponent } from './component/profile/profile.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { PermissionGuard } from './guards/permissions.guards';
import { PlayerStatisticsComponent } from './component/player-statistics/player-statistics.component';
import { TeamListComponent } from './component/team-list/team-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canLoad: [PermissionGuard],
    data: { required_perms: ['dsasads'] },
  }, // Strona główna
  { path: 'login', component: LoginComponent }, // Strona logowania
  { path: 'register', component: RegisterComponent }, // Strona rejestracji
  { path: 'calendar', component: CalendarComponent }, // Strona kalendarza
  { path: 'teams', component: TeamsComponent }, // Strona widoku drużyn
  { path: 'statistics', component: StatisticsComponent }, //Strona widoku statystyk
  { path: 'profile', component: ProfileComponent }, //Strona profilowa
  { path: 'statistics/:id', component: PlayerStatisticsComponent },
  { path: 'teams/:id', component: TeamListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
