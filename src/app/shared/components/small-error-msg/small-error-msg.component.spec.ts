import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallErrorMsgComponent } from './small-error-msg.component';

describe('SmallErrorMsgComponent', () => {
  let component: SmallErrorMsgComponent;
  let fixture: ComponentFixture<SmallErrorMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallErrorMsgComponent],
    });
    fixture = TestBed.createComponent(SmallErrorMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
