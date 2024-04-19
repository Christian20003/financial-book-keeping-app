import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCodeComponent } from './get-code.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('GetCodeComponent', () => {
  let component: GetCodeComponent;
  let fixture: ComponentFixture<GetCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetCodeComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(GetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
