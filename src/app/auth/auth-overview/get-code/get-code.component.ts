import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { slideIn, slideOut } from 'src/app/shared';

@Component({
  selector: 'app-get-code',
  templateUrl: './get-code.component.html',
  styleUrls: ['./get-code.component.scss'],
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
export class GetCodeComponent implements OnInit {
  // Form to be able to enter an email address
  emailForm!: FormGroup;
  // EventEmitter to send the email address to the parent component
  @Output() setEmail = new EventEmitter<string>();

  // All text labels for the HTML template
  text = {
    email: {
      label: 'Email-Adresse',
      missing: 'Bitte eine Email-Adresse angeben',
      invalid: 'Ungültige Email-Adresse',
    },
    sendCode: 'Code senden',
  };

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  /**
   * This function returns the email value of the corresponding element in the form.
   * @returns The control object of email from the form
   */
  get email(): AbstractControl<string, string> | null {
    return this.emailForm.get('email');
  }
  /**
   * This function send the entered email address to the parent component. If the email is not valid then the event will not be triggered.
   */
  onSubmit() {
    if (this.email?.valid) {
      this.setEmail.emit(this.email.value);
    }
  }
}
