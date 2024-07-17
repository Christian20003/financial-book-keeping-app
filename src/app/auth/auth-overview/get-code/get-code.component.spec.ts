import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCodeComponent } from './get-code.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { InvalidInputComponent } from 'src/app/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  triggerInput,
  getNativeElement,
} from 'src/app/testing/testing-support';

describe('GetCodeComponent', () => {
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

  it('U-Test-1: Should create', () => {
    expect(component).toBeTruthy();
  });

  it('U-Test-2: Initial value of email address should be empty', () => {
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    expect(emailInput.value).toBe('');
    expect(component.email?.value).toBeFalsy();
  });

  it('U-Test-3: Initial empty email address should not have an error message', () => {
    const invalidComp = getNativeElement<
      GetCodeComponent,
      InvalidInputComponent
    >(fixture, 'app-invalid-input');
    expect(invalidComp).toBeFalsy();
  });

  it('U-Test-4: Getting an email address via input decorator should set it as default value', () => {
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

  it('U-Test-5: Clicking on "send-code" button with initial empty email address should create an error message component', () => {
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

  it('U-Test-6: Entering an invalid email address should create an error message', () => {
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    emailInput.value = 'Test';
    triggerInput([emailInput]);
    fixture.detectChanges();
    const invalidComp = getNativeElement<
      GetCodeComponent,
      InvalidInputComponent
    >(fixture, 'app-invalid-input');
    expect(invalidComp).toBeTruthy();
  });

  it('U-Test-7: Entering an invalid email address and clicking the "send-code" button should not trigger an EventEmitter', () => {
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
    triggerInput([emailInput]);
    button.click();
    fixture.detectChanges();
    expect(component.setEmail.emit).not.toHaveBeenCalled();
  });

  it('U-Test-8: Clicking the "send-code" button with valid email address should trigger an EventEmitter', () => {
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
    triggerInput([emailInput]);
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
