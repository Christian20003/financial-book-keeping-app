import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavElementsComponent } from './nav-elements.component';

xdescribe('NavElementsComponent', () => {
  let component: NavElementsComponent;
  let fixture: ComponentFixture<NavElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavElementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
