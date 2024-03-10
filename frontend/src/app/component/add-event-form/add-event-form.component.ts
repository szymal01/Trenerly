import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { Team } from 'src/app/models/team';
import { Location } from 'src/app/models/location';
import { AddTeamService } from 'src/app/services/add_team/add-team.service';
import { EventService } from 'src/app/services/event/event.service';
import { LocationService } from 'src/app/services/location/location.service';
import { EventType } from 'src/app/models/event_type';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.scss'],
})
export class AddEventFormComponent implements OnInit {
  event: any = {};
  submitted = false;
  last_date: any;
  teams?: Team[];
  locations?: Location[];
  event_types?: EventType[];

  constructor(
    protected addTeamService: AddTeamService,
    private locationService: LocationService,
    private eventService: EventService,
    protected router: Router,
    protected cd: ChangeDetectorRef,
    private dialogRef: NbDialogRef<any>
  ) {}
  add_event(): void {
    this.submitted = true;
    console.log(this.event.start_time);
    var month_start = this.event.start_date.getMonth() + 1,
      month_end = this.event.end_date.getMonth() + 1,
      day_start = this.event.start_date.getDate(),
      day_end = this.event.end_date.getDate(),
      hours_start = this.event.start_time.getHours(),
      hours_end = this.event.end_time.getHours(),
      minutes_start = this.event.start_time.getMinutes(),
      minutes_end = this.event.end_time.getMinutes(),
      seconds_start = this.event.start_time.getSeconds(),
      seconds_end = this.event.end_time.getSeconds();

    if (this.event.start_date.getMonth() + 1 < 10) {
      month_start = this.event.start_date.getMonth() + 1;
      month_start = '0' + month_start;
    }
    if (this.event.end_date.getMonth() + 1 < 10) {
      month_end = this.event.end_date.getMonth() + 1;
      month_end = '0' + month_end;
    }
    if (this.event.start_date.getDate() < 10) {
      day_start = '0' + this.event.start_date.getDate();
    }
    if (this.event.end_date.getDate() < 10) {
      day_end = '0' + this.event.end_date.getDate();
    }
    if (this.event.start_time.getHours() < 10) {
      hours_start = '0' + this.event.start_time.getHours();
    }
    if (this.event.end_time.getHours() < 10) {
      hours_end = '0' + this.event.end_time.getHours();
    }
    if (this.event.start_time.getMinutes() < 10) {
      minutes_start = '0' + this.event.start_time.getMinutes();
    }
    if (this.event.end_time.getMinutes() < 10) {
      minutes_end = '0' + this.event.end_time.getMinutes();
    }
    if (this.event.start_time.getSeconds() < 10) {
      seconds_start = '0' + this.event.start_time.getSeconds();
    }
    if (this.event.end_time.getSeconds() < 10) {
      seconds_end = '0' + this.event.end_time.getSeconds();
    }

    var data = {
      title: this.event.title,
      start_date:
        this.event.start_date.getFullYear() +
        '-' +
        month_start +
        '-' +
        day_start,
      end_date:
        this.event.end_date.getFullYear() + '-' + month_end + '-' + day_end,
      start_time: hours_start + ':' + minutes_start + ':' + seconds_start,
      end_time: hours_end + ':' + minutes_end + ':' + seconds_start,
      exercises: this.event.exercises,
      location_name: this.event.location_name,
      team_name: this.event.team_name,
      type_name: this.event.type_name,
    };
    console.log(data);
    this.eventService.addEvent(data).subscribe((response) => {
      this.submitted = false;
    });
    this.cd.detectChanges();
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
  get_locations(): void {
    this.locationService.getLocationsList().subscribe((data: any) => {
      this.locations = data;
      // console.log(this.events);
    });
  }
  get_event_types() {
    this.eventService.getEventTypesList().subscribe((data: any) => {
      this.event_types = data;
      // console.log(this.events);
    });
  }

  get_teams(): void {
    this.addTeamService.getTeamsList().subscribe((data: any) => {
      this.teams = data;
      // console.log(this.events);
    });
  }
  ngOnInit() {
    this.get_teams();
    this.get_locations();
    this.get_event_types();
  }
}
