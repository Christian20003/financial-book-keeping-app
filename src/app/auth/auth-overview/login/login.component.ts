import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { slideIn, slideOut } from 'src/app/shared/animations/slideLeftRight';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('slideEffect', [
      transition(':enter', [
        useAnimation(slideIn, {
          params: {
            length: '-50px',
            time: '0.5s',
          },
        }),
      ]),
      transition(
        ':leave',
        useAnimation(slideOut, {
          params: {
            length: '50px',
            time: '0.5s',
          },
        })
      ),
    ]),
  ],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  text = {
    email: {
      label: 'Email-Adresse',
      missing: 'Bitte eine Email-Adresse angeben',
      invalid: 'Ungültige Email-Adresse',
    },
    password: {
      label: 'Passwort',
      missing: 'Bitte ein Passwort eingeben',
    },
    login: 'Anmelden',
    errorMsg: 'Es ist leider ein unerwarteter Fehler aufgetreten',
  };

  error = false;
  loading = false;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    /* TODO: */
    this.error = false;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.error = true;
    }, 8000);
  }
}
