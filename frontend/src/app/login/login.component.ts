import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Tutaj możesz dodać logikę logowania
      console.log('Dane logowania:', this.loginForm.value);
      // Przykład: Przekieruj do innej strony po poprawnym zalogowaniu
      // this.router.navigate(['/dashboard']);
    }
  }
}
