import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { CalendarEvent } from '../../models/events';
import { EventService } from '../../services/event/event.service';
import { formatDate } from '@angular/common';

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
  today = new Date();
  events?: CalendarEvent[];
  todayStr: string;
  constructor(private eventService: EventService) {
    this.todayStr = formatDate(new Date(), 'yyyy-MM-dd', 'pl');
  }

  ngOnInit(): void {
    this.get_events(this.todayStr);
  }
  get_events(date: string): void {
    this.eventService.getEventsList(date).subscribe((data: any) => {
      this.events = data.results;
      console.log(this.events);
    });
  }
}
