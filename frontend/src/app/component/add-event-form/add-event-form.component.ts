import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { Team } from 'src/app/models/team';
import { Location } from 'src/app/models/location';
import { AddTeamService } from 'src/app/services/add_team/add-team.service';
import { EventService } from 'src/app/services/event/event.service';
import { LocationService } from 'src/app/services/location/location.service';

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
  selectedTeam: any;

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
    var data = {
      title: this.event.title,
      start_date:
        this.event.start_date.getFullYear() +
        '-' +
        this.event.start_date.getMonth() +
        '-' +
        this.event.start_date.getDate(),
      end_date:
        this.event.end_date.getFullYear() +
        '-' +
        this.event.end_date.getMonth() +
        '-' +
        this.event.end_date.getDate(),
      start_time:
        this.event.start_time.getHours() +
        ':' +
        this.event.start_time.getMinutes() +
        ':' +
        this.event.start_time.getSeconds(),
      end_time:
        this.event.end_time.getHours() +
        ':' +
        this.event.end_time.getMinutes() +
        ':' +
        this.event.end_time.getSeconds(),
      location: this.event.location,
    };
    console.log(data.location);
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

  get_teams(): void {
    this.addTeamService.getTeamsList().subscribe((data: any) => {
      this.teams = data;
      // console.log(this.events);
    });
  }
  ngOnInit() {
    this.get_teams();
    this.get_locations();
  }
}
