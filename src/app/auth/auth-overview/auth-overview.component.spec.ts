import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOverviewComponent } from './auth-overview.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('AuthOverviewComponent', () => {
  let component: AuthOverviewComponent;
  let fixture: ComponentFixture<AuthOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthOverviewComponent, LoginComponent, RegisterComponent],
      imports: [BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(AuthOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
