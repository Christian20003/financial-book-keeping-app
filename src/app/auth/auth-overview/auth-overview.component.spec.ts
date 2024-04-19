import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AuthOverviewComponent } from './auth-overview.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { AuthenticationService } from './authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { authRoutes } from '../auth-routing-module';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import {
  LoadingComponent,
  SmallErrorMsgComponent,
  initialState,
  userReducer,
  execEvents,
  getNativeElement,
} from 'src/app/shared/index';
import { of, throwError } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { selectUser } from 'src/app/shared/stores/UserStore/User.selector';
import { ReactiveFormsModule } from '@angular/forms';
import { GetCodeComponent } from './get-code/get-code.component';
import { SetCodeComponent } from './set-code/set-code.component';

const loginData = {
  email: 'test.test@test.com',
  password: '123',
};

const user = {
  id: 0,
  name: 'Max',
  imagePath: '/test',
  email: 'test.test@test.com',
  session: {
    token: '3435234',
    expire: 44,
  },
};

/*################################################################################################################################ 
                                                      UNIT-TESTS
################################################################################################################################*/

describe('AuthOverviewComponent', () => {
  let component: AuthOverviewComponent;
  let fixture: ComponentFixture<AuthOverviewComponent>;
  let router: Router;
  let stubService: any;

  beforeEach(() => {
    stubService = jasmine.createSpyObj('AuthenticationService', [
      'onPostLogin',
    ]);
    TestBed.configureTestingModule({
      declarations: [
        AuthOverviewComponent,
        MockComponent(LoginComponent),
        MockComponent(RegisterComponent),
        MockComponent(LoadingComponent),
        MockComponent(SmallErrorMsgComponent),
        MockComponent(GetCodeComponent),
        MockComponent(SetCodeComponent),
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(authRoutes),
      ],
      providers: [
        { provide: AuthenticationService, useValue: stubService },
        provideMockStore({ initialState }),
      ],
    });
    fixture = TestBed.createComponent(AuthOverviewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('U-Test: Should create', () => {
    expect(component).toBeTruthy();
  });

  it('U-Test: Clicking login button should change the route to "/login"', () => {
    const button = getNativeElement<AuthOverviewComponent, HTMLButtonElement>(
      fixture,
      '#login'
    );
    const navigateSpy = spyOn(router, 'navigate');
    button.click();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });

  it('U-Test: Clicking register button should change the route to "/register"', () => {
    const button = getNativeElement<AuthOverviewComponent, HTMLButtonElement>(
      fixture,
      '#register'
    );
    const navigateSpy = spyOn(router, 'navigate');
    button.click();
    expect(navigateSpy).toHaveBeenCalledWith(['register']);
  });

  it('U-Test: Login component should appear after navigating to "/login"', fakeAsync(() => {
    router.navigate(['/login']).then(() => {
      fixture.detectChanges();
      const loginComp = getNativeElement<AuthOverviewComponent, LoginComponent>(
        fixture,
        'app-login'
      );
      expect(loginComp).toBeTruthy();
    });
  }));

  it('U-Test: Register component should appear after navigating to "/register"', fakeAsync(() => {
    router.navigate(['/register']).then(() => {
      fixture.detectChanges();
      const registerComp = getNativeElement<
        AuthOverviewComponent,
        RegisterComponent
      >(fixture, 'app-register');
      expect(registerComp).toBeTruthy();
    });
  }));

  xit('U-Test: ForgetPassword component should appear after navigating to "/login/forgetPassword"', fakeAsync(() => {
    // TODO: Fix test
    router.navigate(['/login/forgetPassword']).then(() => {
      fixture.detectChanges();
      const forgetPwdComp = getNativeElement<
        AuthOverviewComponent,
        GetCodeComponent
      >(fixture, 'app-forget-password');
      expect(forgetPwdComp).toBeTruthy();
    });
  }));

  it('U-Test: Loading component should not be visible at default', () => {
    const loadingComp = getNativeElement<
      AuthOverviewComponent,
      LoadingComponent
    >(fixture, 'app-loading');
    expect(loadingComp).toBeFalsy();
  });

  it('U-Test: Loading component should be visible when corresponding attribute is true', () => {
    component.waiting = true;
    fixture.detectChanges();
    const loadingComp = getNativeElement<
      AuthOverviewComponent,
      LoadingComponent
    >(fixture, 'app-loading');
    expect(loadingComp).toBeTruthy();
  });

  it('U-Test: Small-error-message component should not be visible at default', () => {
    const errorComp = getNativeElement<
      AuthOverviewComponent,
      SmallErrorMsgComponent
    >(fixture, 'app-small-error-msg');
    expect(errorComp).toBeFalsy();
  });

  it('U-Test: Small-error-message component should be visible if the string is not empty', () => {
    component.error = 'Test';
    fixture.detectChanges();
    const errorComp = getNativeElement<
      AuthOverviewComponent,
      SmallErrorMsgComponent
    >(fixture, 'app-small-error-msg');
    expect(errorComp).toBeTruthy();
  });

  it('U-Test: After calling submit(), the error attribute should be empty and waiting should be true', () => {
    stubService.onPostLogin.and.returnValue(of());
    component.onSubmit(loginData);
    fixture.detectChanges();
    expect(component.waiting).toBeTrue();
    expect(component.error).toBe('');
  });

  it('U-Test: After calling submit() and getting a truthy result, waiting should be false', () => {
    stubService.onPostLogin.and.returnValue(of(user));
    component.onSubmit(loginData);
    fixture.detectChanges();
    expect(component.waiting).toBeFalse();
    expect(component.error).toBe('');
  });

  it('U-Test: After calling submit() and getting an error, waiting should be false and error should have specific default message', () => {
    stubService.onPostLogin.and.returnValue(
      throwError(() => {
        return new Error();
      })
    );
    component.onSubmit(loginData);
    fixture.detectChanges();
    expect(component.waiting).toBeFalse();
    expect(component.error).toBe('Es ist ein unerwarteter Fehler eingetreten.');
  });

  it('U-Test: After calling submit() and getting an error with errorCode 401, the error attribute should have specific message', () => {
    stubService.onPostLogin.and.returnValue(
      throwError(() => {
        return { status: 401 };
      })
    );
    component.onSubmit(loginData);
    fixture.detectChanges();
    expect(component.waiting).toBeFalse();
    expect(component.error).toBe('Die angegebenen Daten sind ungültig.');
  });

  it('U-Test: After calling submit() and getting an error, SmallError component should be displayed', () => {
    stubService.onPostLogin.and.returnValue(
      throwError(() => {
        return new Error();
      })
    );
    component.onSubmit(loginData);
    fixture.detectChanges();
    const errorComp = getNativeElement<
      AuthOverviewComponent,
      SmallErrorMsgComponent
    >(fixture, 'app-small-error-msg');
    expect(errorComp).toBeTruthy();
  });
});

/*################################################################################################################################ 
                                                      INTEGRATION-TESTS
################################################################################################################################*/

describe('AuthOverviewComponent - Integration Tests', () => {
  let fixture: ComponentFixture<AuthOverviewComponent>;
  let component: AuthOverviewComponent;
  let service: AuthenticationService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthOverviewComponent,
        LoginComponent,
        RegisterComponent,
        LoadingComponent,
        SmallErrorMsgComponent,
        SetCodeComponent,
        GetCodeComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(authRoutes),
        HttpClientModule,
        StoreModule.forRoot({ user: userReducer }, {}),
        ReactiveFormsModule,
      ],
      providers: [AuthenticationService],
    });
    fixture = TestBed.createComponent(AuthOverviewComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthenticationService);
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  xit('I-Test: After calling submit() and getting a truthy result, the store should be updated', fakeAsync(() => {
    // TODO: Fix test
    spyOn(service, 'onPostLogin').and.callFake(() => of(user));
    component.onSubmit(loginData);
    fixture.detectChanges();
    store.select(selectUser).subscribe(state => {
      expect(state).toBeTruthy();
      expect(state.name).toBe(user.name);
      expect(state.session.token).toBe(user.session.token);
    });
  }));

  it('I-Test: After clicking the login button, the onSubmit() function should be called', fakeAsync(() => {
    spyOn(component, 'onSubmit');
    const router = TestBed.inject(Router);
    router.navigate(['/login']).then(() => {
      fixture.detectChanges();
      const emailInput = getNativeElement<
        AuthOverviewComponent,
        HTMLInputElement
      >(fixture, '#email');
      const passwordInput = getNativeElement<
        AuthOverviewComponent,
        HTMLInputElement
      >(fixture, '#password');
      const button = getNativeElement<AuthOverviewComponent, HTMLButtonElement>(
        fixture,
        '#login-button'
      );
      emailInput.value = 'test@test.de';
      passwordInput.value = '233';
      execEvents([emailInput, passwordInput], ['input', 'blur']);
      fixture.detectChanges();
      button.click();
      fixture.detectChanges();
      expect(component.onSubmit).toHaveBeenCalled();
    });
  }));

  it('I-Test: After clicking "forget password" <a> element, the onForgetPwd() function should be called', fakeAsync(() => {
    spyOn(component, 'onForgetPwd');
    const router = TestBed.inject(Router);
    router.navigate(['/login']).then(() => {
      fixture.detectChanges();
      const forgetPwdComp = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#forget-pwd');
      forgetPwdComp.click();
      fixture.detectChanges();
      expect(component.onForgetPwd).toHaveBeenCalled();
    });
  }));
});
