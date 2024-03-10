import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.scss'],
})
export class PlayerStatisticsComponent {
  users: any;
  stats: any;

  constructor(private service: EventService, private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    console.log(userId);
    this.service.getStats({ user: userId }).subscribe((data) => {
      this.stats = data;
      // console.log(this.events);
    });
  }
}
