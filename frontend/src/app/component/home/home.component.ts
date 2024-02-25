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
