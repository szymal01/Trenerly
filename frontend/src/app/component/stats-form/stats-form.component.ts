import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { AddTeamService } from 'src/app/services/add_team/add-team.service';
import { EventService } from 'src/app/services/event/event.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-stats-form',
  templateUrl: './stats-form.component.html',
  styleUrls: ['./stats-form.component.scss'],
})
export class StatsFormComponent implements OnInit {
  stats: any = {};
  users: any = {};
  submitted = false;
  player: any = {};
  constructor(
    private eventService: EventService,
    private userService: UserService,
    protected router: Router,
    protected cd: ChangeDetectorRef,
    private dialogRef: NbDialogRef<any>
  ) {}
  add_stats(): void {
    console.log(this.stats);
    console.log(this.player.id);
    var data = {
      player_id: this.player.id,
      title: this.stats.title,
      points: this.stats.points,
      service_sum: this.stats.service_sum,
      ace: this.stats.ace,
      service_errors: this.stats.service_errors,
      spikes: this.stats.spikes,
      spike_errors: this.stats.spike_errors,
      spikes_blocked: this.stats.spikes_blocked,
      spike_points: this.stats.spike_points,
      receive_sum: this.stats.receive_sum,
      receive_errors: this.stats.receive_errors,
      receive_negative: this.stats.receive_negative,
      receive_positive: this.stats.receive_positive,
      receive_perfect: this.stats.receive_perfect,
      blocks: this.stats.blocks,
      stats: this.stats,
    };
    console.log(data);
    this.eventService.addStats(data).subscribe((response) => {
      this.submitted = false;
    });
    this.cd.detectChanges();
    this.close();
  }
  get_users() {
    this.userService.getUsersList().subscribe((data: any) => {
      this.users = data;
    });
  }
  close() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.get_users();
  }
}
