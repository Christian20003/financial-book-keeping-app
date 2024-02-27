import { trigger, transition, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { slideIn, slideOut } from 'src/app/shared/animations/slideLeftRight';

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
  login = true;

  onLogin() {
    this.login = true;
  }

  onRegister() {
    this.login = false;
  }
}
