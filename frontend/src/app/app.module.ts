import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    NbInputModule,
    NbAccordionModule,
    BrowserAnimationsModule,
    NbSearchModule,
    NbChatModule.forRoot({ messageGoogleMapKey: 'MAP_KEY' }),
    NbRadioModule,
    NbCheckboxModule,
    NbStepperModule,
    NbSidebarModule,
  ],
  providers: [
    LocationService,
    EventService,
    { provide: LOCALE_ID, useValue: 'pl' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
