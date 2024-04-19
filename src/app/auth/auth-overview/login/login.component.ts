import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { slideIn, slideOut } from 'src/app/shared/index';

/**
 * This interface represents the structure of the data which will be sent through the login event.
 *
 * @property {string} email - The entered email address from the user
 * @property {string} password - The entered password from the user
 */
export interface loginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('slideEffect', [
      // If some error message to the input element should be rendered it will use the a slideIn animation
      transition(':enter', [
        useAnimation(slideIn, {
          params: {
            length: '-50px',
            time: '0.5s',
          },
        }),
      ]),
      // If some error message to the input element should be destroyed it will use the a slideOut animation
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
export class LoginComponent implements OnInit {
  //EventEmitter to sent the entered login data to the parent component.
  @Output() login = new EventEmitter<loginData>();
  // EventEmitter to signal the parent component that the user forgot his password.
  @Output() forgetPwd = new EventEmitter();

  // The reactive login form
  loginForm!: FormGroup;

  // All text values which are used in this component.
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
    forgetPwd: 'Passwort vergessen?',
  };

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  /**
   * This function returns the email value of the corresponding element in the form.
   * @returns The control object of email from the form
   */
  get email(): AbstractControl<string, string> | null {
    return this.loginForm.get('email');
  }

  /**
   * This function returns the password value of the corresponding element in the form.
   * @returns The control object of password from the form
   */
  get password(): AbstractControl<string, string> | null {
    return this.loginForm.get('password');
  }

  /**
   * This function emits an event to the parent component with the entered data in the form. If one of the elements are not
   * valid the event will not be emitted.
   */
  onSubmit(): void {
    if (this.email?.valid && this.password?.valid) {
      this.login.emit({
        email: this.email.value,
        password: this.password.value,
      });
    }
  }

  /**
   * This function emits ann event to the parent component that the user has clicked the 'forget-pwd' <a> element.
   */
  onForgetPassword(): void {
    this.forgetPwd.emit();
  }
}
