import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbSearchService } from '@nebular/theme';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { PlayerStatisticsComponent } from '../player-statistics/player-statistics.component';
import { StatsFormComponent } from '../stats-form/stats-form.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  value = '';
  users: any;

  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    private service: UserService
  ) {}
  ngOnInit(): void {
    this.get_player_list();
  }
  addStats() {
    this.dialogService
      .open(StatsFormComponent)
      .onClose.subscribe(() => this.get_player_list());
  }
  go_to_player_stats(userId: any) {
    this.router.navigate(['/statistics', userId]);
  }
  get_player_list() {
    this.service.getUsersList().subscribe((data: any) => {
      this.users = data;
      // console.log(this.events);
    });
  }
}
