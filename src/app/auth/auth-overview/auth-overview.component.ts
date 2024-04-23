import { trigger, transition, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { slideIn, slideOut, setUser } from 'src/app/shared/index';
import { loginData } from './login/login.component';
import { Router } from '@angular/router';
import {
  getCodePath,
  loginPath,
  registerPath,
  setCodePath,
} from '../auth-routing-module';
import { AuthenticationService } from './authentication.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth-overview',
  templateUrl: './auth-overview.component.html',
  styleUrls: ['./auth-overview.component.scss'],
  animations: [
    trigger('slideLeft', [
      transition(':enter', [
        useAnimation(slideIn, {
          params: {
            length: '-50px',
            time: '1s',
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(slideOut, {
          params: {
            length: '-50px',
            time: '0.5s',
          },
        }),
      ]),
    ]),
    trigger('slideRight', [
      transition(':enter', [
        useAnimation(slideIn, {
          params: {
            length: '100px',
            time: '1s',
          },
        }),
      ]),
      transition(':leave', [
        useAnimation(slideOut, {
          params: {
            length: '100px',
            time: '0.5s',
          },
        }),
      ]),
    ]),
  ],
})
export class AuthOverviewComponent {
  waiting = false;
  error = '';
  email = '';

  text = {
    errorMessages: {
      unknown: 'Es ist ein unerwarteter Fehler eingetreten.',
      wrong: 'Die angegebenen Daten sind ungültig.',
    },
  };

  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthenticationService
  ) {}

  onLogin() {
    this.router.navigate([loginPath]);
  }

  onRegister() {
    this.router.navigate([registerPath]);
  }

  onForgetPwd() {
    this.router.navigate([loginPath, getCodePath]);
  }

  onSetEmail(email: string) {
    this.email = email;
    //TODO: Send a request via service
    this.router.navigate([loginPath, setCodePath]);
  }

  isLogin() {
    return this.router.url.includes(loginPath);
  }

  isGetAccessCode() {
    return this.router.url.includes(getCodePath);
  }

  isSetAccessCode() {
    return this.router.url.includes(setCodePath);
  }

  onSubmit(data: loginData) {
    this.error = '';
    this.waiting = true;
    this.authService.onPostLogin(data).subscribe({
      next: response => {
        this.store.dispatch(setUser({ user: response }));
        this.waiting = false;
        // TODO: Changes route
        /* this.router.navigate(); */
      },
      error: error => {
        this.waiting = false;
        switch (error.status) {
          case 401:
            this.error = this.text.errorMessages.wrong;
            break;
          default:
            this.error = this.text.errorMessages.unknown;
            break;
        }
      },
    });
  }
}
