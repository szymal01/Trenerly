import { Component } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { PlayerStatisticsComponent } from '../player-statistics/player-statistics.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  value = '';
  users?: User[];

  constructor(
    private searchService: NbSearchService,
    private service: UserService
  ) {
    this.service.getUsersList().subscribe((data: any) => {
      this.users = data;
      // console.log(this.events);
    });
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.value = data.term;
    });
  }
}
