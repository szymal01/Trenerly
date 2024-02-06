import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { CalendarEvent } from '../models/events';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridWeek',
    weekends: true,
    events: [{ title: 'Meeting', start: new Date() }],
    locale: 'pl',
  };
  date = new Date();
  events?: CalendarEvent[];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    const today = new Date();

    this.eventService.getEventsList().subscribe((data: any) => {
      this.events = data.results;
      console.log(this.events);
    });
  }
}
