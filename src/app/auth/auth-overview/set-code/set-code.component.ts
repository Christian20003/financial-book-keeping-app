import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { moveLeftToRight } from 'src/app/shared';

/**
 * This interface represents the structure of data which will be emitted by the SetCodeComponent.
 * It consists of all code values.
 *
 * @property {number} value1  - The first code value
 * @property {number} value2  - The second code value
 * @property {number} value3  - The third code value
 * @property {number} value4  - The forth code value
 * @property {number} value5  - The fifth code value
 * @property {number} value6  - The sixth code value
 */
export interface loginCode {
  value1: number;
  value2: number;
  value3: number;
  value4: number;
  value5: number;
  value6: number;
}

@Component({
  selector: 'app-set-code',
  templateUrl: './set-code.component.html',
  styleUrls: ['./set-code.component.scss'],
  animations: [moveLeftToRight],
})
export class SetCodeComponent implements OnInit {
  // The formGroup which saves the user input with the code.
  codeForm!: FormGroup;
  // The eventEmitter which sends the entered code to the parent component
  @Output() sendCode = new EventEmitter<loginCode>();
  // Bool which identifies if a complete access code has been entered
  isInvalid = false;

  // The static text
  text = {
    proofCode: 'Code senden',
    missing: 'Bitte vollständigen Code eingeben',
  };

  ngOnInit(): void {
    this.codeForm = new FormGroup({
      value1: new FormControl(null, Validators.required),
      value2: new FormControl(null, Validators.required),
      value3: new FormControl(null, Validators.required),
      value4: new FormControl(null, Validators.required),
      value5: new FormControl(null, Validators.required),
      value6: new FormControl(null, Validators.required),
    });
  }

  /**
   * This function moves on to the next input element if the value of the current input element isn't falsy.
   *
   * @param currrent  - The current input element which received an input event
   * @param next      - The next input element which should be focused
   */
  toNext(currrent: HTMLInputElement, next: HTMLInputElement): void {
    if (currrent.value) {
      next.focus();
    }
  }

  /**
   * This function sends a message to the parent component with all 6 entered values of the form.
   * If the user does not completely fill out the form an error message will be displayed.
   */
  onSubmit(): void {
    if (this.codeForm.valid) {
      this.sendCode.emit({
        value1: this.getValue('value1'),
        value2: this.getValue('value2'),
        value3: this.getValue('value3'),
        value4: this.getValue('value4'),
        value5: this.getValue('value5'),
        value6: this.getValue('value6'),
      });
    } else {
      this.isInvalid = true;
    }
  }

  /**
   * This function returns the value from the {@link FormControl} with the corresponding key. If the entered
   * key does not exist in the {@link codeForm} it will return 0.
   *
   * @param key   - The key of the {@link FormControl} element
   * @returns       If the {@link FormControl} exist, its saved value otherwise 0
   */
  private getValue(key: string): number {
    const control = this.codeForm.get(key);
    return control?.value ? control.value : 0;
  }
}
