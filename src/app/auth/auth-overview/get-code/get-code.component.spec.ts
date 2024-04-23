import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCodeComponent } from './get-code.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import {
  InvalidInputComponent,
  execEvents,
  getNativeElement,
} from 'src/app/shared';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GetCodeComponent - Unit Tests', () => {
  let component: GetCodeComponent;
  let fixture: ComponentFixture<GetCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetCodeComponent, MockComponent(InvalidInputComponent)],
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(GetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('U-Test: Should create', () => {
    expect(component).toBeTruthy();
  });

  it('U-Test: Initial value of email address should be empty', () => {
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    expect(emailInput.value).toBe('');
    expect(component.email?.value).toBeFalsy();
  });

  it('U-Test: Initial empty email address should not have an error message', () => {
    const invalidComp = getNativeElement<
      GetCodeComponent,
      InvalidInputComponent
    >(fixture, 'app-invalid-input');
    expect(invalidComp).toBeFalsy();
  });

  it('U-Test: Getting an email address via input decorator should set it as default value', () => {
    fixture = TestBed.createComponent(GetCodeComponent);
    component = fixture.componentInstance;
    component.emailValue = 'test@test.com';
    fixture.detectChanges();
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    expect(emailInput.value).toBe('test@test.com');
    expect(component.email?.value).toBe('test@test.com');
  });

  it('U-Test: Clicking on "send-code" button with initial empty email address should create an error message component', () => {
    const button = getNativeElement<GetCodeComponent, HTMLButtonElement>(
      fixture,
      '#send-code-button'
    );
    button.click();
    fixture.detectChanges();
    const invalidComp = getNativeElement<
      GetCodeComponent,
      InvalidInputComponent
    >(fixture, 'app-invalid-input');
    expect(invalidComp).toBeTruthy();
  });

  it('U-Test: Entering an invalid email address should create an error message', () => {
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    emailInput.value = 'Test';
    execEvents([emailInput], ['input', 'blur']);
    fixture.detectChanges();
    const invalidComp = getNativeElement<
      GetCodeComponent,
      InvalidInputComponent
    >(fixture, 'app-invalid-input');
    expect(invalidComp).toBeTruthy();
  });

  it('U-Test: Entering an invalid email address and clicking the "send-code" button should not trigger an EventEmitter', () => {
    spyOn(component.setEmail, 'emit');
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const button = getNativeElement<GetCodeComponent, HTMLButtonElement>(
      fixture,
      '#send-code-button'
    );
    emailInput.value = 'Test';
    execEvents([emailInput], ['input', 'blur']);
    button.click();
    fixture.detectChanges();
    expect(component.setEmail.emit).not.toHaveBeenCalled();
  });

  it('U-Test: Clicking the "send-code" button with valid email address should trigger an EventEmitter', () => {
    spyOn(component.setEmail, 'emit');
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const button = getNativeElement<GetCodeComponent, HTMLButtonElement>(
      fixture,
      '#send-code-button'
    );
    emailInput.value = 'test@test.com';
    execEvents([emailInput], ['input', 'blur']);
    button.click();
    fixture.detectChanges();
    const invalidComp = getNativeElement<
      GetCodeComponent,
      InvalidInputComponent
    >(fixture, 'app-invalid-input');
    expect(component.setEmail.emit).toHaveBeenCalled();
    expect(component.setEmail.emit).toHaveBeenCalledWith('test@test.com');
    expect(invalidComp).toBeFalsy();
  });
});

describe('GetCodeComponent - Integration Tests', () => {
  let component: GetCodeComponent;
  let fixture: ComponentFixture<GetCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetCodeComponent, InvalidInputComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(GetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('I-Test: Clicking the "send-code" button with empty email address should display correct error message', () => {
    const button = getNativeElement<GetCodeComponent, HTMLButtonElement>(
      fixture,
      '#send-code-button'
    );
    button.click();
    fixture.detectChanges();
    const invalidComp = fixture.debugElement.query(
      By.directive(InvalidInputComponent)
    );
    expect(invalidComp.componentInstance.message).toBe(
      component.text.email.missing
    );
  });

  it('I-Test: Clicking the "send-code" button with invalid email address should not change the error message', () => {
    const button = getNativeElement<GetCodeComponent, HTMLButtonElement>(
      fixture,
      '#send-code-button'
    );
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    emailInput.value = 'Test';
    execEvents([emailInput], ['input', 'blur']);
    //fixture.detectChanges();
    button.click();
    fixture.detectChanges();
    const invalidComp = fixture.debugElement.query(
      By.directive(InvalidInputComponent)
    );
    expect(invalidComp.componentInstance.message).toBe(
      component.text.email.invalid
    );
  });
});
