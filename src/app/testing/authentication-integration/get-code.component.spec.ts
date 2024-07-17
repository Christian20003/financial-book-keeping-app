import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetCodeComponent } from 'src/app/auth/auth-overview/get-code/get-code.component';
import { InvalidInputComponent } from 'src/app/shared';
import {
  getComponent,
  getNativeElement,
  triggerInput,
} from '../testing-support';

describe('GetCodeComponent', () => {
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

  it('I-Test-1: Clicking the "send-code" button with empty email address should display correct error message', () => {
    const button = getNativeElement<GetCodeComponent, HTMLButtonElement>(
      fixture,
      '#send-code-button'
    );
    button.click();
    fixture.detectChanges();
    const invalidComp = getComponent<GetCodeComponent, InvalidInputComponent>(
      fixture,
      InvalidInputComponent
    );
    expect(invalidComp.componentInstance.message).toBe(
      component.text.email.missing
    );
  });

  it('I-Test-2: Clicking the "send-code" button with invalid email address should not change the error message', () => {
    const button = getNativeElement<GetCodeComponent, HTMLButtonElement>(
      fixture,
      '#send-code-button'
    );
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    emailInput.value = 'Test';
    triggerInput([emailInput]);
    button.click();
    fixture.detectChanges();
    const invalidComp = getComponent<GetCodeComponent, InvalidInputComponent>(
      fixture,
      InvalidInputComponent
    );
    expect(invalidComp.componentInstance.message).toBe(
      component.text.email.invalid
    );
  });
});
