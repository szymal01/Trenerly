import { Component } from '@angular/core';
import { Team } from 'src/app/models/team';
import { AddTeamService } from 'src/app/services/add_team/add-team.service';
import { CurrentUserService } from 'src/app/services/current_user/current-user.service';
import { UserService } from 'src/app/services/user/user.service';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import { NbDialogRef, NbDialogService, NbSearchService } from '@nebular/theme';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user_uuid: string = '';
  user: any;
  teams?: Team[];
  constructor(
    private currentUserService: CurrentUserService,
    private userService: UserService,
    private dialogService: NbDialogService,
    private service: AddTeamService
  ) {}

  get_currentUserUUID(): string {
    if (this.user_uuid == '') {
      this.currentUserService.getUserUUID().subscribe((data: any) => {
        this.user_uuid = data;
      });
    }
    return this.user_uuid;
  }
  getUser() {
    this.userService
      .getUser(this.get_currentUserUUID())
      .subscribe((data: any) => {
        this.user = data;
      });
  }

  saveUser() {
    this.user.first_name = 'asjbdsa';
    this.userService
      .updateUser(this.get_currentUserUUID(), this.user)
      .subscribe((data: any) => {
        this.user = data;
      });
  }
  get_teams(): void {
    this.service.getTeamsList().subscribe((data: any) => {
      this.teams = data;
      // console.log(this.events);
    });
  }

  updateUser() {
    this.dialogService
      .open(EditProfileFormComponent)
      .onClose.subscribe(() => this.getUser());
  }

  ngOnInit() {
    this.getUser();
    this.get_teams();
  }
}
