import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { LocationService } from 'src/app/services/location/location.service';
import { Location } from '../../models/location';

@Component({
  selector: 'app-add-location-form',
  templateUrl: './add-location-form.component.html',
  styleUrls: ['./add-location-form.component.scss'],
})
export class AddLocationFormComponent {
  location: any = {};
  submitted = false;
  constructor(
    protected service: LocationService,
    protected router: Router,
    protected cd: ChangeDetectorRef,
    private dialogRef: NbDialogRef<any>
  ) {}
  add_location(): void {
    this.submitted = true;
    this.service.addLocation(this.location).subscribe(() => {
      this.submitted = false;
    });
    this.cd.detectChanges();
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
}
