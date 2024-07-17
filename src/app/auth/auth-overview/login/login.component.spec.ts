import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InvalidInputComponent } from 'src/app/shared/index';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  getNativeElement,
  getNativeElements,
  triggerInput,
} from 'src/app/testing/testing-support';

describe('LoginComponent - Unit Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, MockComponent(InvalidInputComponent)],
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('U-TEST-1: Component should create', () => {
    expect(component).toBeTruthy();
  });

  it('U-TEST-2: The number of input elements should equal the number of formControls', () => {
    const formElement = fixture.debugElement.query(By.css('#login-form'));
    const inputElements = formElement.queryAll(By.css('input'));
    const emailFormGroup = component.loginForm.get('email');
    const passwordFormGroup = component.loginForm.get('password');

    expect(inputElements.length).toEqual(2);
    expect(emailFormGroup).toBeTruthy();
    expect(passwordFormGroup).toBeTruthy();
  });

  it('U-TEST-3: Initial values of the form', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    const form = component.loginForm;
    const initValues = { email: null, password: null };

    expect(form.value).toEqual(initValues);
    expect(emailInput.value).toEqual('');
    expect(passwordInput.value).toEqual('');
  });

  it('U-TEST-4: Validation of empty email before interaction', () => {
    const emailControl = component.loginForm.get('email');
    const invalidComp = getNativeElement<LoginComponent, InvalidInputComponent>(
      fixture,
      'app-invalid-input'
    );
    expect(invalidComp).toBeFalsy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
  });

  it('U-TEST-5: Validation of empty email after interaction', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    emailInput.value = '';
    triggerInput([emailInput]);
    fixture.detectChanges();

    const emailControl = component.loginForm.get('email');
    const invalidComp = getNativeElement<LoginComponent, InvalidInputComponent>(
      fixture,
      'app-invalid-input'
    );
    expect(invalidComp).toBeTruthy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
  });

  it('U-TEST-6: Validation of false email after interaction', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    emailInput.value = 'wrongEmail.de';
    triggerInput([emailInput]);
    fixture.detectChanges();

    const emailControl = component.loginForm.get('email');
    const invalidComp = getNativeElement<LoginComponent, InvalidInputComponent>(
      fixture,
      'app-invalid-input'
    );
    expect(invalidComp).toBeTruthy();
    expect(emailControl?.errors?.['email']).toBeTruthy();
  });

  it('U-TEST-7: Validation of empty password before interaction', () => {
    const emailFormGroup = component.loginForm.get('password');
    const invalidComp = getNativeElement<LoginComponent, InvalidInputComponent>(
      fixture,
      'app-invalid-input'
    );
    expect(invalidComp).toBeFalsy();
    expect(emailFormGroup?.errors?.['required']).toBeTruthy();
  });

  it('U-TEST-8: Validation of empty password after interaction', () => {
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    passwordInput.value = '';
    triggerInput([passwordInput]);
    fixture.detectChanges();

    const passwordControl = component.loginForm.get('password');
    const invalidComp = getNativeElement<LoginComponent, InvalidInputComponent>(
      fixture,
      'app-invalid-input'
    );

    expect(invalidComp).toBeTruthy();
    expect(passwordControl?.errors?.['required']).toBeTruthy();
  });

  it('U-TEST-9: Validation of valid form', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    emailInput.value = 'example@gmail.com';
    passwordInput.value = 'examplePassword';
    triggerInput([emailInput, passwordInput]);
    fixture.detectChanges();
    const invalidComp = getNativeElement<LoginComponent, InvalidInputComponent>(
      fixture,
      'app-invalid-input'
    );

    expect(component.loginForm.valid).toBeTruthy();
    expect(invalidComp).toBeFalsy();
  });

  it('U-Test-10: Invalid form should not be submitted and errors should be displayed', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    const loginButton = getNativeElement<LoginComponent, HTMLButtonElement>(
      fixture,
      '#login-button'
    );
    emailInput.value = 'Test';
    passwordInput.value = '';
    triggerInput([emailInput, passwordInput]);
    spyOn(component.login, 'emit');
    loginButton.click();
    fixture.detectChanges();

    const invalidComp = getNativeElements<
      LoginComponent,
      InvalidInputComponent
    >(fixture, 'app-invalid-input');
    const length = invalidComp.length;
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.login.emit).not.toHaveBeenCalled();
    expect(length).toEqual(2);
  });

  it('U-Test-11: Valid form should be submitted', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    const loginButton = getNativeElement<LoginComponent, HTMLButtonElement>(
      fixture,
      '#login-button'
    );
    emailInput.value = 'example@gmail.com';
    passwordInput.value = 'examplePassword';
    triggerInput([emailInput, passwordInput]);
    spyOn(component.login, 'emit');
    loginButton.click();
    fixture.detectChanges();

    const invalidComp = getNativeElement<LoginComponent, InvalidInputComponent>(
      fixture,
      'app-invalid-input'
    );
    expect(component.loginForm.valid).toBeTruthy();
    expect(component.login.emit).toHaveBeenCalled();
    expect(invalidComp).toBeFalsy();
  });

  it('U-Test-12: The forgetPwd emitter should be triggerd if the forget password button will be clicked', () => {
    const forgetPwd = getNativeElement<LoginComponent, HTMLButtonElement>(
      fixture,
      '#forget-pwd'
    );
    spyOn(component.forgetPwd, 'emit');
    forgetPwd.click();
    fixture.detectChanges();

    expect(component.forgetPwd.emit).toHaveBeenCalled();
  });
});
