import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const getNativeElement = <T, R>(
  fixture: ComponentFixture<T>,
  selector: string
): R => {
  const debugElem = fixture.debugElement.query(By.css(selector));
  return debugElem?.nativeNode as R;
};

export const getNativeElements = <T, R>(
  fixture: ComponentFixture<T>,
  selector: string
): R[] => {
  const debugElements = fixture.debugElement.queryAll(By.css(selector));
  const result: R[] = [];
  for (const element of debugElements) {
    result.push(element.nativeNode as R);
  }
  return result;
};

export const getComponent = <T, R>(
  fixture: ComponentFixture<T>,
  type: Type<R>
): DebugElement => {
  return fixture.debugElement.query(By.directive(type));
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
