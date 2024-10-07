import { Component, inject } from '@angular/core';
import { RegisterForm } from './register.form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  public readonly formService = inject(RegisterForm); 
  public readonly form = this.formService.registerForm; 
  
  // this shall be outsourced to shared
  public readonly text = {
    vorname: {
      label: 'Vorname',
      missing: 'Bitte einen Vorname angeben',
      invalid: 'Ungültiger Vorname',
    },
    nachname: {
      label: 'Nachname',
      missing: 'Bitte einen Nachname angeben',
      invalid: 'Ungültiger Nachname',
    },
    email: {
      label: 'Email-Adresse',
      missing: 'Bitte eine Email-Adresse angeben',
      invalid: 'Ungültige Email-Adresse',
    },
    password: {
      label: 'Passwort',
      missing: 'Bitte ein Passwort eingeben',
      invalid: 'Ungültig Passwort, soll ein grßes Buchstabe und eine Sonderzeichen geben',
    },
    pwcheck: {
      label: 'Passwort',
      missing: 'Bitte ein Passwort eingeben',
      invalid: 'Die PW stimmen nicht überein',
    }
  };

}
