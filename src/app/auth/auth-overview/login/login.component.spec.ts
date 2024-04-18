import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  InvalidInputComponent,
  execEvents,
  getNativeElement,
} from 'src/app/shared/index';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*################################################################################################################################ 
                                                      UNIT-TESTS
################################################################################################################################*/

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

  it('U-TEST: Component should create', () => {
    expect(component).toBeTruthy();
  });

  it('U-TEST: Equal number of elements - HTML and TS-Form', () => {
    // Get HTML-input elements as well as formGroup elements.
    const formElement = fixture.debugElement.query(By.css('#login-form'));
    const inputElements = formElement.queryAll(By.css('input'));
    const emailFormGroup = component.loginForm.get('email');
    const passwordFormGroup = component.loginForm.get('password');

    /* TESTS */

    // 2 HTML-elements
    expect(inputElements.length).toEqual(2);
    // Valid email FormControl element
    expect(emailFormGroup).toBeTruthy();
    // Valid password FormControl element
    expect(passwordFormGroup).toBeTruthy();
  });

  it('U-TEST: Initial values of the form', () => {
    // Get HTML-input elements
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    // Get FormGroup object
    const form = component.loginForm;
    // Initial data
    const initValues = { email: null, password: null };

    /* TESTS */

    // Initial values of FormGroup object should be null
    expect(form.value).toEqual(initValues);
    // HTML-input elements should be empty strings
    expect(emailInput.value).toEqual('');
    expect(passwordInput.value).toEqual('');
  });

  it('U-TEST: Validation of initial empty email', () => {
    const emailFormGroup = component.loginForm.get('email');
    // The 'required' validator should return error
    expect(emailFormGroup?.errors?.['required']).toBeTruthy();
  });

  it('U-TEST: Validation of empty email with error message', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    // Set empty value and trigger corresponding events
    emailInput.value = '';
    execEvents([emailInput], ['input', 'blur']);
    fixture.detectChanges();
    // Get changed content to be tested
    const emailFormGroup = component.loginForm.get('email');
    const invalidComp = fixture.debugElement.query(
      By.directive(InvalidInputComponent)
    );

    /* TESTS */

    // Component with 'invalid message' should exist
    expect(invalidComp).toBeTruthy();
    // The 'required' validator should return error
    expect(emailFormGroup?.errors?.['required']).toBeTruthy();
  });

  it('U-TEST: Validation of false email', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    // Set invalid value and trigger corresponding events
    emailInput.value = 'wrongEmail.de';
    execEvents([emailInput], ['input', 'blur']);
    fixture.detectChanges();
    // Get changed content to be tested
    const emailFormGroup = component.loginForm.get('email');
    const invalidComp = fixture.debugElement.query(
      By.directive(InvalidInputComponent)
    );

    /* TESTS */

    // Component with 'invalid message' should exist
    expect(invalidComp.componentInstance).toBeTruthy();
    // The 'email' validator should return error
    expect(emailFormGroup?.errors?.['email']).toBeTruthy();
  });

  it('U-TEST: Validation of initial empty password', () => {
    const emailFormGroup = component.loginForm.get('password');
    // The 'required' validator should return error
    expect(emailFormGroup?.errors?.['required']).toBeTruthy();
  });

  it('U-TEST: Validation of empty password with error message', () => {
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    // Set empty value and trigger corresponding events
    passwordInput.value = '';
    execEvents([passwordInput], ['input', 'blur']);
    fixture.detectChanges();
    // Get changed content to be tested
    const emailFormGroup = component.loginForm.get('password');
    const invalidComp = fixture.debugElement.query(
      By.directive(InvalidInputComponent)
    );

    /* TESTS */

    // Component with 'invalid message' should exist
    expect(invalidComp).toBeTruthy();
    // The 'required' validator should return error
    expect(emailFormGroup?.errors?.['required']).toBeTruthy();
  });

  it('U-TEST: Validation of valid form', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    // Set valid values and trigger corresponding events
    emailInput.value = 'example@gmail.com';
    passwordInput.value = 'examplePassword';
    execEvents([emailInput, passwordInput], ['input', 'blur']);
    fixture.detectChanges();
    // Get changed content to be tested
    const invalidComp = fixture.debugElement.query(
      By.directive(InvalidInputComponent)
    );

    /* TESTS */

    // FormGroup object should be valid
    expect(component.loginForm.valid).toBeTruthy();
    // Component with 'invalid message' should not exist
    expect(invalidComp).toBeFalsy();
  });

  it('U-Test: Invalid form should not be submitted', () => {
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
    // Set invalid values and trigger corresponding events
    emailInput.value = 'Test';
    passwordInput.value = '';
    execEvents([emailInput, passwordInput], ['input', 'blur']);
    // Add spy to the emit() function
    spyOn(component.login, 'emit');
    loginButton.click();
    fixture.detectChanges();

    /* TESTS */

    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.login.emit).not.toHaveBeenCalled();
  });

  it('U-Test: Valid form should be submitted', () => {
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
    // Set valid values and trigger corresponding events
    emailInput.value = 'example@gmail.com';
    passwordInput.value = 'examplePassword';
    execEvents([emailInput, passwordInput], ['input', 'blur']);
    // Add spy to the emit() function
    spyOn(component.login, 'emit');
    fixture.detectChanges();
    loginButton.click();
    fixture.detectChanges();

    /* TESTS */

    expect(component.loginForm.valid).toBeTruthy();
    expect(component.login.emit).toHaveBeenCalled();
  });
});

/*################################################################################################################################ 
                                                      INTEGRATION-TESTS
################################################################################################################################*/

describe('LoginComponent - Integration Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, InvalidInputComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('I-TEST: Validation of empty email with correct error message', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    // Set error message
    component.text.email.missing = 'Missing email';
    // Set empty value and trigger corresponding events
    emailInput.value = '';
    execEvents([emailInput], ['input', 'blur']);
    fixture.detectChanges();
    // Get changed content to be tested
    const invalidComp = fixture.debugElement.query(
      By.directive(InvalidInputComponent)
    );

    /* TESTS */

    // Component with 'invalid message' should exist
    expect(invalidComp.componentInstance.message).toBe('Missing email');
  });

  it('I-TEST: Validation of invalid email with correct error message', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    // Set error message
    component.text.email.invalid = 'Invalid email';
    // Set empty value and trigger corresponding events
    emailInput.value = 'wrongEmail.de';
    execEvents([emailInput], ['input', 'blur']);
    fixture.detectChanges();
    // Get changed content to be tested
    const invalidComp = fixture.debugElement.query(
      By.directive(InvalidInputComponent)
    );

    /* TESTS */

    // Component with 'invalid message' should exist
    expect(invalidComp.componentInstance.message).toBe('Invalid email');
  });

  it('I-TEST: Validation of empty password with correct error message', () => {
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    // Set error message
    component.text.password.missing = 'Missing password';
    // Set empty value and trigger corresponding events
    passwordInput.value = '';
    execEvents([passwordInput], ['input', 'blur']);
    fixture.detectChanges();
    // Get changed content to be tested
    const invalidComp = fixture.debugElement.query(
      By.directive(InvalidInputComponent)
    );

    /* TESTS */

    // Component with 'invalid message' should exist
    expect(invalidComp.componentInstance.message).toBe('Missing password');
  });
});
