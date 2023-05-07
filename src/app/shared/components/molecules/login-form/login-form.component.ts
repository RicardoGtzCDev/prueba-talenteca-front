import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ILogin, Login } from 'src/app/shared/models/login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<ILogin>();

  loginForm = this.fb.group({
    user: ['', [Validators.required]],
    pass: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  onSubmit() {
    if (this.loginForm.value.user && this.loginForm.value.pass) {
      const loginData = new Login(this.loginForm.value.user, this.loginForm.value.pass);
      this.login.emit(loginData);
    }
  }
}
