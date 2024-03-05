import { ChangeDetectorRef, Component } from '@angular/core';
import { AddTeamService } from 'src/app/services/add_team/add-team.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-team-form',
  templateUrl: './add-team-form.component.html',
  styleUrls: ['./add-team-form.component.scss'],
})
export class AddTeamFormComponent {
  team: any = {};
  submitted = false;
  constructor(
    protected service: AddTeamService,
    protected router: Router,
    protected cd: ChangeDetectorRef,
    private dialogRef: NbDialogRef<any>
  ) {}
  add_team(): void {
    this.submitted = true;
    this.service.addTeam(this.team).subscribe((response) => {
      this.submitted = false;
      if (response.name) {
        this.router.navigate(['/teams']);
      } else {
      }
    });
    this.cd.detectChanges();
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
}
