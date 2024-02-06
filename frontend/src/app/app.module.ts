import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
} from '@nebular/theme';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TeamsComponent } from './teams/teams.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StatuteComponent } from './statute/statute.component';
import { LocationService } from './services/location/location.service';
import { EventService } from './services/event/event.service';

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
  ],
  providers: [LocationService, EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
