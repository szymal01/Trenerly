import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // Importuj AppRoutingModule
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbLayoutModule,
  NbCardModule,
  NbThemeModule,
  NbButtonModule,
  NbCalendarModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbActionsModule,
  NbSidebarModule,
  NbCalendarRangeModule,
  NbDatepickerModule,
  NbInputModule,
  NbAccordionModule,
  NbSearchModule,
  NbChatModule,
  NbRadioModule,
  NbCheckboxModule,
  NbStepperModule,
  NbAlertModule,
  NbIconModule,
  NbDialogModule,
  NbTimepickerModule,
  NbListModule,
  NbSelectModule,
} from '@nebular/theme';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { CalendarComponent } from './component/calendar/calendar.component';
import { TeamsComponent } from './component/teams/teams.component';
import { MessagesComponent } from './component/messages/messages.component';
import { ProfileComponent } from './component/profile/profile.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { StatuteComponent } from './component/statute/statute.component';
import { LocationService } from './services/location/location.service';
import { EventService } from './services/event/event.service';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import {
  NbAuthModule,
  NbAuthOAuth2JWTToken,
  NbPasswordAuthStrategy,
  getDeepFromObject,
} from '@nebular/auth';
import { RefreshTokenInterceptor } from './interceptors/jwt-refresh-token-interceptor';
import { JWTInterceptor } from './interceptors/jwt-interceptor';
import { UserService } from './services/user/user.service';
import { StatsFormComponent } from './component/stats-form/stats-form.component';
import { AddEventFormComponent } from './component/add-event-form/add-event-form.component';
import { AddTeamFormComponent } from './component/add-team-form/add-team-form.component';
import { EditProfileFormComponent } from './component/edit-profile-form/edit-profile-form.component';
import { PlayerStatisticsComponent } from './component/player-statistics/player-statistics.component';
import { TeamListComponent } from './component/team-list/team-list.component';
import { PermRequiredDirective } from './directives/perm-required.derective';
import { AddLocationFormComponent } from './component/add-location-form/add-location-form.component';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CalendarComponent,
    TeamsComponent,
    MessagesComponent,
    ProfileComponent,
    StatisticsComponent,
    StatuteComponent,
    StatsFormComponent,
    AddEventFormComponent,
    AddTeamFormComponent,
    EditProfileFormComponent,
    PlayerStatisticsComponent,
    TeamListComponent,
    PermRequiredDirective,
    AddLocationFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Dodaj AppRoutingModule do sekcji imports
    FullCalendarModule, // register FullCalendar with your app
    HttpClientModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbCalendarModule,
    NbMenuModule.forRoot(),
    NbRouteTabsetModule,
    NbActionsModule,
    NbSidebarModule.forRoot(),
    NbCalendarRangeModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbInputModule,
    NbAccordionModule,
    BrowserAnimationsModule,
    NbSearchModule,
    NbChatModule.forRoot({ messageGoogleMapKey: 'MAP_KEY' }),
    NbRadioModule,
    NbCheckboxModule,
    NbStepperModule,
    NbSidebarModule,
    NbAlertModule,
    FormsModule,
    NbIconModule,
    NbListModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbCalendarRangeModule,
    NbDialogModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthOAuth2JWTToken,
            key: 'token',
          },
          baseEndpoint: 'http://localhost:8000',
          register: {
            alwaysFail: false,
            endpoint: '/users/',
            method: 'post',
            requireValidToken: true,
            redirect: {
              success: '/login',
              failure: null,
            },
            defaultErrors: ['Coś poszło nie tak... Spróbuj ponownie.'],
            defaultMessages: [
              'Rejestracja przebiegła pomyślnie. Zaloguj się na swoje konto.',
            ],
          },
          login: {
            redirect: {
              success: '/home',
              failure: null,
            },
            endpoint: '/api/token/',
            method: 'post',
            requireValidToken: true,
            defaultErrors: [
              'Brak komunikacji. Sprawdź czy jest dozwolona komunikacja na porcie 8000. Jeżeli problem dalej występuje skontaktuj sie z administaratorem.',
            ],
          },
          refreshToken: {
            endpoint: '/api/refresh-token/',
            redirect: {
              success: '/',
              failure: 'login/',
            },
            requireValidToken: true,
          },
          logout: {
            endpoint: '',
          },
          messages: {
            key: '',
            getter: (
              module: string | number,
              res: { body: {} },
              options: { [x: string]: { defaultMessages: any }; messages: any }
            ) =>
              getDeepFromObject(
                res.body,
                options.messages.key,
                options[module].defaultMessages
              ),
          },
          errors: {
            key: 'detail',
            getter: (
              module: string | number,
              res: { error: { [x: string]: any } },
              options: { [x: string]: { defaultErrors: any }; errors: any }
            ) => {
              if (res.error[options.errors.key])
                return res.error[options.errors.key];
              else return options[module].defaultErrors;
            },
          },
        }),
      ],
      forms: {},
    }),
  ],
  providers: [
    LocationService,
    UserService,
    EventService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'pl' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
