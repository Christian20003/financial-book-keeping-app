import { ComponentFixture } from '@angular/core/testing';

export const getNativeElement = <T, R>(
  fixture: ComponentFixture<T>,
  selector: string
): R => {
  return fixture.nativeElement.querySelector(selector) as R;
};

export const execEvents = (
  elements: HTMLInputElement[],
  events: string[]
): void => {
  for (const element of elements) {
    for (const event of events) {
      element.dispatchEvent(new Event(event));
    }
  }
};
