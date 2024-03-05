import { Component, OnInit } from '@angular/core';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { CalendarEvent } from '../../models/events';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // events?: CalendarEvent[];
  // date_range: Date = new Date();
  // constructor(private eventService: EventService) {}

  // ngOnInit(): void {
  //   const today = new Date();

  //   this.eventService.getEventsList().subscribe((data: any) => {
  //     this.events = data;
  //     //console.log(this.events);
  //   });
  // }
  range: NbCalendarRange<Date>;
  events?: CalendarEvent[];
  fromDate: Date;
  toDate: Date;

  constructor(
    protected dateService: NbDateService<Date>,
    private eventService: EventService
  ) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };
    this.fromDate = this.range.start;
    this.toDate = new Date(this.range.end || Date());
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
}
