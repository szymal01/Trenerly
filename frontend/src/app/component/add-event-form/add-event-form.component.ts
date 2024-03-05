import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { AddTeamService } from 'src/app/services/add_team/add-team.service';

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
  selectedTeam: any;
  options = [
    { value: '1', label: 'Jednorazowo' },
    { value: '7', label: 'Co tydzień' },
  ];
  option: any;
  constructor(
    protected service: AddTeamService,
    protected router: Router,
    protected cd: ChangeDetectorRef
  ) {}
  add_team(): void {
    this.submitted = true;

    this.cd.detectChanges();
  }
  get_teams(): void {
    this.service.getTeamsList().subscribe((data: any) => {
      this.teams = data;
      // console.log(this.events);
    });
  }
  ngOnInit() {
    this.get_teams();
  }
}
