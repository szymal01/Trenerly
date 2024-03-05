import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService, NbSearchService } from '@nebular/theme';
import { AddTeamFormComponent } from '../add-team-form/add-team-form.component';
import { AddTeamService } from 'src/app/services/add_team/add-team.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dictionary } from '@fullcalendar/core/internal';
import { AddEventFormComponent } from '../add-event-form/add-event-form.component';
import { Team } from 'src/app/models/team';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  value = '';
  teams?: Team[];
  constructor(
    private searchService: NbSearchService,
    private dialogService: NbDialogService,
    private service: AddTeamService
  ) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.value = data.term;
    });
  }
  addTeam() {
    this.dialogService
      .open(AddTeamFormComponent)
      .onClose.subscribe(() => this.get_teams());
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
