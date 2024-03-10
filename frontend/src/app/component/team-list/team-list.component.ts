import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDeepFromObject } from '@nebular/auth';
import { NbDialogModule, NbDialogService } from '@nebular/theme';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { AddTeamService } from 'src/app/services/add_team/add-team.service';
import { UserService } from 'src/app/services/user/user.service';
import { StatsFormComponent } from '../stats-form/stats-form.component';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit {
  users?: User[];
  team: any;
  teamId: any;
  submitted = false;
  player: any = {};

  constructor(
    private service: AddTeamService,
    private userService: UserService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.get_team();
  }
  add_playerToTeam() {
    //   console.log(this.user.email);
    //   const teamId = this.route.snapshot.paramMap.get('id');
    //   var data = { email: this.user.email, teamId: teamId };
    //   console.log(data);
    //   this.userService.addPlayerToTeam(data).subscribe((response) => {
    //     this.submitted = false;
    //   });
    // }
    console.log(this.player.email);
    const teamId = this.route.snapshot.paramMap.get('id');
    var data = { email: this.player.email, teamId: teamId };
    console.log(data);
    this.userService.addPlayerToTeam(data).subscribe(
      (response) => {
        this.submitted = false;
        this.get_team();
      },
      (error) => {
        // Obsługa błędów - wyświetlenie komunikatu błędu lub podjęcie innych działań
        console.error(
          'Wystąpił błąd podczas dodawania zawodnika do drużyny:',
          error
        );
      }
    );
  }
  get_team() {
    const teamId = this.route.snapshot.paramMap.get('id');
    console.log(teamId);
    this.service.getTeam(teamId).subscribe((data) => {
      this.team = data;
      // console.log(this.events);
    });
  }
}
