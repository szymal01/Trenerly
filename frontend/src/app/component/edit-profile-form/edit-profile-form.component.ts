import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, getDeepFromObject } from '@nebular/auth';
import { NbDialogRef } from '@nebular/theme';
import { Team } from 'src/app/models/team';
import { CurrentUserService } from 'src/app/services/current_user/current-user.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
})
export class EditProfileFormComponent implements OnInit {
  team: any = {};
  submitted = false;
  user_uuid: string = '';
  user: any;
  teams?: Team[];
  dialogService: any;
  constructor(
    private currentUserService: CurrentUserService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    private userService: UserService,
    protected router: Router,
    protected cd: ChangeDetectorRef,
    private dialogRef: NbDialogRef<any>
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
  updateUser(): void {
    console.log(this.user.birth_details);
    this.userService
      .updateUser(this.get_currentUserUUID(), this.user)
      .subscribe((data: any) => {
        this.submitted = true;
        this.user = data;
      });
    this.cd.detectChanges();
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
  ngOnInit(): void {
    this.getUser();
  }
}
