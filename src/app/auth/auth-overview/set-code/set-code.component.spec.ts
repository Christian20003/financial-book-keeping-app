import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCodeComponent } from './set-code.component';

xdescribe('SetCodeComponent', () => {
  let component: SetCodeComponent;
  let fixture: ComponentFixture<SetCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetCodeComponent],
    });
    fixture = TestBed.createComponent(SetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
