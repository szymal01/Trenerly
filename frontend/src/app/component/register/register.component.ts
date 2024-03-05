import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dictionary } from '@fullcalendar/core/internal';
import {
  NB_AUTH_OPTIONS,
  NbAuthResult,
  NbAuthService,
  NbAuthSocialLink,
  NbLoginComponent,
  getDeepFromObject,
} from '@nebular/auth';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  socialLinks: NbAuthSocialLink[] = [];

  constructor(
    protected service: UserService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router
  ) {
    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = { error: true };
    this.strategy = this.getConfigValue('forms.register.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    this.service.registerUser(this.user).subscribe(
      (response) => {
        this.submitted = false;
        if (response.email) {
          this.router.navigate(['/login']);
        } else {
        }
      },
      (error) => {
        this.submitted = false;
        console.log(
          this.showMessages.error && this.errors?.length && !this.submitted
        );
        this.errors = [
          'Użytkownik o podanym adresie E-mail lub podanej nazwie użytkownika już istnieje.',
        ];
      }
    );
    this.cd.detectChanges();
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
