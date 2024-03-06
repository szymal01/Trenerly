import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  NbCalendarRange,
  NbDateService,
  NbDialogService,
} from '@nebular/theme';
import { CalendarEvent } from '../../models/events';
import { EventService } from '../../services/event/event.service';
import { formatDate } from '@angular/common';
import { StatsFormComponent } from '../stats-form/stats-form.component';
import { AddEventFormComponent } from '../add-event-form/add-event-form.component';
import { AddLocationFormComponent } from '../add-location-form/add-location-form.component';

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

  range: NbCalendarRange<Date>;
  fromDate: Date;
  toDate: Date;

  constructor(
    protected dateService: NbDateService<Date>,
    private eventService: EventService,
    private dialogService: NbDialogService
  ) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };
    this.fromDate = this.range.start;
    this.toDate = new Date(this.range.end || Date());
    this.todayStr = formatDate(new Date(), 'yyyy-MM-dd', 'pl');
  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  getRangeDate(event: any) {
    if (event.start && event.end) {
      this.fromDate = new Date(event.start);
      console.log(this.fromDate.toISOString());
      this.toDate = new Date(event.end);

      this.getEvents();
    }
  }
  getEvents() {
    var month_start = this.fromDate.getMonth() + 1;
    var month_end = this.toDate.getMonth() + 1;
    var data = {
      start_date:
        this.fromDate.getFullYear() +
        '-' +
        month_start +
        '-' +
        this.fromDate.getDate(),
      end_date:
        this.toDate.getFullYear() +
        '-' +
        month_end +
        '-' +
        this.toDate.getDate(),
    };
    this.eventService.getEventsList(data).subscribe((data: any) => {
      this.events = data;
    });
  }
  ngOnInit(): void {
    this.getEvents();
  }
  addStats() {
    this.dialogService.open(StatsFormComponent).onClose.subscribe();
  }

  addEvent() {
    this.dialogService.open(AddEventFormComponent).onClose.subscribe();
  }
  addLocation() {
    this.dialogService.open(AddLocationFormComponent).onClose.subscribe();
  }
}
