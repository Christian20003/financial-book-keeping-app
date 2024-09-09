import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { AuthOverviewComponent } from './auth-overview.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { AuthenticationService } from './authentication.service';
import { authRoutes } from '../auth-routing-module';
import { Router, RouterModule } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  LoadingComponent,
  SmallErrorMsgComponent,
  initialState,
  userReducer,
  execEvents,
  getNativeElement,
  getComponent,
  getNativeElements,
} from 'src/app/shared/index';
import { of, throwError } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { HttpErrorResponse, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { selectUser } from 'src/app/shared/stores/UserStore/User.selector';
import { ReactiveFormsModule } from '@angular/forms';
import { GetCodeComponent } from './get-code/get-code.component';
import { SetCodeComponent } from './set-code/set-code.component';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { EffectsModule } from '@ngrx/effects';
import { userEffects } from 'src/app/shared/stores/UserStore/User.effects';

describe('AuthOverviewComponent', () => {
  let component: AuthOverviewComponent;
  let fixture: ComponentFixture<AuthOverviewComponent>;
  let router: Router;
  let mockStore: MockStore;
  let store: Store;
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;
  let stubService = jasmine.createSpyObj('AuthenticationService', [
    'postLogin',
    'postRegister',
    'postEmail',
    'postCode',
  ]);
  const user = {
    id: 1,
    name: 'Max',
    imagePath: '/test',
    email: 'test-test@test.com',
    session: {
      token: '3435234',
      expire: 44,
    },
  };

  /*################################################################################################################################ 
                                                      UNIT-TESTS
################################################################################################################################*/

  describe('#Unit-Tests', () => {
    const createComponent = () => {
      stubService = jasmine.createSpyObj('AuthenticationService', [
        'postLogin',
        'postRegister',
        'postEmail',
        'postCode',
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
        imports: [BrowserAnimationsModule, RouterModule.forRoot(authRoutes)],
        providers: [
          { provide: AuthenticationService, useValue: stubService },
          provideMockStore({ initialState }),
        ],
      });
      fixture = TestBed.createComponent(AuthOverviewComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      mockStore = TestBed.inject(MockStore);
      fixture.detectChanges();
    };

    /*-----------------------------------------------------Route testing--------------------------------------------------------*/

    describe('- Route testing', () => {
      beforeEach(createComponent);

      it('U-Test: Clicking login button should change the route to "/login"', () => {
        const button = getNativeElement<
          AuthOverviewComponent,
          HTMLButtonElement
        >(fixture, '#login');
        const navigateSpy = spyOn(router, 'navigate');
        button.click();
        expect(navigateSpy).toHaveBeenCalledWith(['login']);
      });

      it('U-Test: Clicking register button should change the route to "/register"', () => {
        const button = getNativeElement<
          AuthOverviewComponent,
          HTMLButtonElement
        >(fixture, '#register');
        const navigateSpy = spyOn(router, 'navigate');
        button.click();
        expect(navigateSpy).toHaveBeenCalledWith(['register']);
      });

      it('U-Test: The onForgetPwd function should change the route to "/login/resetPassword"', () => {
        const navigateSpy = spyOn(router, 'navigate');
        component.onForgetPwd();
        expect(navigateSpy).toHaveBeenCalledWith(['login', 'resetPassword']);
      });

      it('U-Test: The isLogin function should return true if the keyword "login" is in the path', fakeAsync(() => {
        router.navigate(['/login']).then(() => {
          expect(component.isLogin()).toBeTrue();
        });
      }));

      it('U-Test: The isLogin function should return false if the keyword "login" is not in the path', () => {
        expect(component.isLogin()).toBeFalse();
      });

      it('U-Test: The isCode function should return true if the keyword "resetPassword" is in the path', fakeAsync(() => {
        router.navigate(['/login/resetPassword']).then(() => {
          expect(component.isCode()).toBeTrue();
        });
      }));

      it('U-Test: The isCode function should return false if the keyword "resetPassword" is not in the path', () => {
        expect(component.isCode()).toBeFalse();
      });
    });

    /*-------------------------------------------------Component appearing------------------------------------------------------*/

    describe('- Component Appearing', () => {
      beforeEach(createComponent);

      it('U-Test: Should create', () => {
        expect(component).toBeTruthy();
      });

      it('U-Test: Login component should appear after navigating to "/login"', fakeAsync(() => {
        router.navigate(['/login']).then(() => {
          fixture.detectChanges();
          const loginComp = getNativeElement<
            AuthOverviewComponent,
            LoginComponent
          >(fixture, 'app-login');
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

      it('U-Test: GetCode component should appear after navigating to "/login/resetPassword" and empty email', fakeAsync(() => {
        router.navigate(['/login/resetPassword']).then(() => {
          fixture.detectChanges();
          const getCodeComp = getNativeElement<
            AuthOverviewComponent,
            GetCodeComponent
          >(fixture, 'app-get-code');
          expect(getCodeComp).toBeTruthy();
        });
      }));

      it('U-Test: SetCode component should appear after navigating to "/login/resetPassword" and not empty email', fakeAsync(() => {
        component.email = 'max@mustermann.com';
        router.navigate(['/login/resetPassword']).then(() => {
          fixture.detectChanges();
          const setCodeComp = getNativeElement<
            AuthOverviewComponent,
            SetCodeComponent
          >(fixture, 'app-set-code');
          expect(setCodeComp).toBeTruthy();
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
    });

    /*-----------------------------------------------------onSubmitLogin----------------------------------------------------------*/

    describe('- onSubmitLogin', () => {
      const loginData = {
        email: 'test.test@test.com',
        password: '123',
      };

      beforeEach(createComponent);

      it('U-Test: After calling function, the error attribute should be empty and waiting should be true', () => {
        stubService.postLogin.and.returnValue(of());
        component.onSubmitLogin(loginData);
        fixture.detectChanges();
        expect(component.waiting).toBeTrue();
        expect(component.error).toBe('');
      });

      it('U-Test: After calling function and getting a truthy result, the error attribute should be empty waiting should be false', () => {
        stubService.postLogin.and.returnValue(of(user));
        component.onSubmitLogin(loginData);
        fixture.detectChanges();
        expect(component.waiting).toBeFalse();
        expect(component.error).toBe('');
      });

      it('U-Test: After calling function and getting an error, waiting should be false and error should have specific message', () => {
        stubService.postLogin.and.returnValue(
          throwError(() => {
            return new Error('Es ist ein unerwarteter Fehler eingetreten.');
          })
        );
        component.onSubmitLogin(loginData);
        fixture.detectChanges();
        expect(component.waiting).toBeFalse();
        expect(component.error).toBe(
          'Es ist ein unerwarteter Fehler eingetreten.'
        );
      });

      it('U-Test: After calling function and getting an error, SmallError component should be displayed', () => {
        stubService.postLogin.and.returnValue(
          throwError(() => {
            return new Error('Es ist ein unerwarteter Fehler eingetreten.');
          })
        );
        component.onSubmitLogin(loginData);
        fixture.detectChanges();
        const errorComp = getNativeElement<
          AuthOverviewComponent,
          SmallErrorMsgComponent
        >(fixture, 'app-small-error-msg');
        expect(errorComp).toBeTruthy();
      });

      it('U-Test: After calling function with an successfull http request, the dispatch function of the store should be called', () => {
        spyOn(mockStore, 'dispatch');
        stubService.postLogin.and.returnValue(of(user));
        component.onSubmitLogin(loginData);
        fixture.detectChanges();
        expect(mockStore.dispatch).toHaveBeenCalled();
      });
    });

    /*----------------------------------------------------onSubmitRegister--------------------------------------------------------*/

    describe('- onSubmitRegister', () => {
      const registerData = {
        email: 'test.test@test.com',
        name: 'dummy',
        password: '123',
      };

      beforeEach(createComponent);

      it('U-Test: After calling function, the error attribute should be empty and waiting should be true', () => {
        stubService.postRegister.and.returnValue(of());
        component.onSubmitRegister(registerData);
        fixture.detectChanges();
        expect(component.waiting).toBeTrue();
        expect(component.error).toBe('');
      });

      it('U-Test: After calling function and getting a truthy result, the error attribute should be empty waiting should be false', () => {
        stubService.postRegister.and.returnValue(of(user));
        component.onSubmitRegister(registerData);
        fixture.detectChanges();
        expect(component.waiting).toBeFalse();
        expect(component.error).toBe('');
      });

      it('U-Test: After calling function and getting an error, waiting should be false and error should have specific message', () => {
        stubService.postRegister.and.returnValue(
          throwError(() => {
            return new Error('Es ist ein unerwarteter Fehler eingetreten.');
          })
        );
        component.onSubmitRegister(registerData);
        fixture.detectChanges();
        expect(component.waiting).toBeFalse();
        expect(component.error).toBe(
          'Es ist ein unerwarteter Fehler eingetreten.'
        );
      });

      it('U-Test: After calling function and getting an error, SmallError component should be displayed', () => {
        stubService.postRegister.and.returnValue(
          throwError(() => {
            return new Error('Es ist ein unerwarteter Fehler eingetreten.');
          })
        );
        component.onSubmitRegister(registerData);
        fixture.detectChanges();
        const errorComp = getNativeElement<
          AuthOverviewComponent,
          SmallErrorMsgComponent
        >(fixture, 'app-small-error-msg');
        expect(errorComp).toBeTruthy();
      });

      it('U-Test: After calling function with an successfull http request, the dispatch function of the store should be called', () => {
        spyOn(mockStore, 'dispatch');
        stubService.postRegister.and.returnValue(of(user));
        component.onSubmitRegister(registerData);
        fixture.detectChanges();
        expect(mockStore.dispatch).toHaveBeenCalled();
      });
    });

    /*----------------------------------------------------onSubmitRegister--------------------------------------------------------*/

    describe('- onSubmitRegister', () => {
      const registerData = {
        email: 'test.test@test.com',
        name: 'dummy',
        password: '123',
      };

      beforeEach(createComponent);

      it('U-Test: After calling function, the error attribute should be empty and waiting should be true', () => {
        stubService.postRegister.and.returnValue(of());
        component.onSubmitRegister(registerData);
        fixture.detectChanges();
        expect(component.waiting).toBeTrue();
        expect(component.error).toBe('');
      });

      it('U-Test: After calling function and getting a truthy result, the error attribute should be empty waiting should be false', () => {
        stubService.postRegister.and.returnValue(of(user));
        component.onSubmitRegister(registerData);
        fixture.detectChanges();
        expect(component.waiting).toBeFalse();
        expect(component.error).toBe('');
      });

      it('U-Test: After calling function and getting an error, waiting should be false and error should have specific message', () => {
        stubService.postRegister.and.returnValue(
          throwError(() => {
            return new Error('Es ist ein unerwarteter Fehler eingetreten.');
          })
        );
        component.onSubmitRegister(registerData);
        fixture.detectChanges();
        expect(component.waiting).toBeFalse();
        expect(component.error).toBe(
          'Es ist ein unerwarteter Fehler eingetreten.'
        );
      });

      it('U-Test: After calling function and getting an error, SmallError component should be displayed', () => {
        stubService.postRegister.and.returnValue(
          throwError(() => {
            return new Error('Es ist ein unerwarteter Fehler eingetreten.');
          })
        );
        component.onSubmitRegister(registerData);
        fixture.detectChanges();
        const errorComp = getNativeElement<
          AuthOverviewComponent,
          SmallErrorMsgComponent
        >(fixture, 'app-small-error-msg');
        expect(errorComp).toBeTruthy();
      });

      it('U-Test: After calling function with an successfull http request, the dispatch function of the store should be called', () => {
        spyOn(mockStore, 'dispatch');
        stubService.postRegister.and.returnValue(of(user));
        component.onSubmitRegister(registerData);
        fixture.detectChanges();
        expect(mockStore.dispatch).toHaveBeenCalled();
      });
    });

    /*---------------------------------------------------------onSetCode------------------------------------------------------------*/

    describe('- onSetCode', () => {
      const securityCode = {
        value1: 1,
        value2: 1,
        value3: 1,
        value4: 1,
        value5: 1,
        value6: 1,
      };

      beforeEach(createComponent);

      it('U-Test: After calling function, the error attribute should be empty and waiting should be true', () => {
        stubService.postCode.and.returnValue(of());
        component.onSetCode(securityCode);
        fixture.detectChanges();
        expect(component.waiting).toBeTrue();
        expect(component.error).toBe('');
      });

      it('U-Test: After calling function and getting a truthy result, the error attribute should be empty waiting should be false', () => {
        stubService.postCode.and.returnValue(of('Success'));
        component.onSetCode(securityCode);
        fixture.detectChanges();
        expect(component.waiting).toBeFalse();
        expect(component.error).toBe('');
      });

      it('U-Test: After calling function and getting an error, waiting should be false and error should have specific message', () => {
        stubService.postCode.and.returnValue(
          throwError(() => {
            return new Error('Es ist ein unerwarteter Fehler eingetreten.');
          })
        );
        component.onSetCode(securityCode);
        fixture.detectChanges();
        expect(component.waiting).toBeFalse();
        expect(component.error).toBe(
          'Es ist ein unerwarteter Fehler eingetreten.'
        );
      });

      it('U-Test: After calling function and getting an error, SmallError component should be displayed', () => {
        stubService.postCode.and.returnValue(
          throwError(() => {
            return new Error('Es ist ein unerwarteter Fehler eingetreten.');
          })
        );
        component.onSetCode(securityCode);
        fixture.detectChanges();
        const errorComp = getNativeElement<
          AuthOverviewComponent,
          SmallErrorMsgComponent
        >(fixture, 'app-small-error-msg');
        expect(errorComp).toBeTruthy();
      });

      it('U-Test: After calling function with an successfull http request, a navigation to loginPath should appear', () => {
        const navigateSpy = spyOn(router, 'navigate');
        stubService.postCode.and.returnValue(of('Success'));
        component.onSetCode(securityCode);
        fixture.detectChanges();
        expect(navigateSpy).toHaveBeenCalledWith(['login']);
      });
    });

    /*---------------------------------------------------------onSetEmail-----------------------------------------------------------*/

    describe('- onSetCode', () => {
      const email = 'max@mustermann.com';

      beforeEach(createComponent);

      it('U-Test: After calling function, the error attribute should be empty and waiting should be true', () => {
        stubService.postEmail.and.returnValue(of());
        component.onSetEmail(email);
        fixture.detectChanges();
        expect(component.waiting).toBeTrue();
        expect(component.error).toBe('');
      });

      it('U-Test: After calling function and getting a truthy result, the error attribute should be empty waiting should be false', () => {
        stubService.postEmail.and.returnValue(of(email));
        component.onSetEmail(email);
        fixture.detectChanges();
        expect(component.waiting).toBeFalse();
        expect(component.error).toBe('');
      });

      it('U-Test: After calling function and getting an error, waiting should be false and error should have specific message', () => {
        stubService.postEmail.and.returnValue(
          throwError(() => {
            return new Error('Es ist ein unerwarteter Fehler eingetreten.');
          })
        );
        component.onSetEmail(email);
        fixture.detectChanges();
        expect(component.waiting).toBeFalse();
        expect(component.error).toBe(
          'Es ist ein unerwarteter Fehler eingetreten.'
        );
      });

      it('U-Test: After calling function and getting an error, SmallError component should be displayed', () => {
        stubService.postEmail.and.returnValue(
          throwError(() => {
            return new Error('Es ist ein unerwarteter Fehler eingetreten.');
          })
        );
        component.onSetEmail(email);
        fixture.detectChanges();
        const errorComp = getNativeElement<
          AuthOverviewComponent,
          SmallErrorMsgComponent
        >(fixture, 'app-small-error-msg');
        expect(errorComp).toBeTruthy();
      });

      it('U-Test: After calling function with an successfull http request, a navigation to loginPath should appear', () => {
        stubService.postEmail.and.returnValue(of(email));
        component.onSetEmail(email);
        fixture.detectChanges();
        expect(component.email).toBeTruthy();
        expect(component.email).toBe(email);
      });
    });
  });

  /*################################################################################################################################ 
                                                      INTEGRATION-TESTS
################################################################################################################################*/

  describe('#Integration-Tests', () => {
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
    imports: [BrowserAnimationsModule,
        RouterModule.forRoot(authRoutes),
        StoreModule.forRoot({ user: userReducer }, {}),
        EffectsModule.forRoot([userEffects]),
        ReactiveFormsModule],
    providers: [AuthenticationService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
      fixture = TestBed.createComponent(AuthOverviewComponent);
      component = fixture.componentInstance;
      service = TestBed.inject(AuthenticationService);
      store = TestBed.inject(Store);
      router = TestBed.inject(Router);
      httpTestingController = TestBed.inject(HttpTestingController);

      fixture.detectChanges();
    });

    // TODO: Add integration tests for registration

    it('I-Test: Completely successful login process', fakeAsync(() => {
      // Click on the login button to get the login form
      const loginButton = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#login');
      loginButton.click();
      tick(100);
      fixture.detectChanges();

      // Add valid values to the login form
      const email = getNativeElement<AuthOverviewComponent, HTMLInputElement>(
        fixture,
        '#email'
      );
      const password = getNativeElement<
        AuthOverviewComponent,
        HTMLInputElement
      >(fixture, '#password');
      email.value = user.email;
      password.value = '1234';
      execEvents([email, password], ['input', 'blur']);
      fixture.detectChanges();

      // Click on the login button to trigger a HTTP request
      const submit = getNativeElement<AuthOverviewComponent, HTMLButtonElement>(
        fixture,
        '#login-button'
      );
      submit.click();
      fixture.detectChanges();

      // Define the response of the HTTP request
      const req = httpTestingController.expectOne(service.LOGIN_PATH);
      user.email = 'test@doener.com';
      req.flush(user);

      // Proof if data is sent to the store
      store.select(selectUser).subscribe({
        next: state => {
          expect(state.id).toBe(user.id);
          expect(state.name).toBe(user.name);
          expect(state.imagePath).toBe(user.imagePath);
          expect(state.email).toBe(user.email);
          expect(state.session).toEqual(user.session);
        },
      });
      // TODO: Proof if the navigation was successful
    }));

    it('I-Test: Completely successful reset password process', fakeAsync(() => {
      // Click on the login button to get the login form
      const loginButton = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#login');
      loginButton.click();
      tick(100);
      fixture.detectChanges();

      // Click on the forget password button
      const forgetPwdButton = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#forget-pwd');
      forgetPwdButton.click();
      tick(100);
      fixture.detectChanges();

      // Add an email address where the security code should be sent
      const email = getNativeElement<AuthOverviewComponent, HTMLInputElement>(
        fixture,
        '#email'
      );
      const submitEmail = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#send-code-button');
      email.value = user.email;
      execEvents([email], ['input', 'blur']);
      submitEmail.click();

      // Define HTTP request
      const postEmailReq = httpTestingController.expectOne(
        service.CODE_PATH,
        'Post email address request'
      );
      postEmailReq.flush(user.email);
      fixture.detectChanges();

      // Set code
      const codeFields = getNativeElements<
        AuthOverviewComponent,
        HTMLInputElement
      >(fixture, 'input');
      const submitCodeButton = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#proof-code-button');
      for (const field of codeFields) {
        field.value = '1';
      }
      execEvents([...codeFields], ['input', 'blur']);
      submitCodeButton.click();

      // Define HTTP request
      const postCodeReq = httpTestingController.expectOne(
        service.CODE_PATH,
        'Post security code request'
      );
      postCodeReq.flush('Success');
      fixture.detectChanges();

      tick(100);
      expect(router.url).toBe('/login');
    }));

    it('I-Test: Completely unsuccessful login process', fakeAsync(() => {
      // Click on the login button to get the login form
      const loginButton = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#login');
      loginButton.click();
      tick(100);
      fixture.detectChanges();

      // Add valid values to the login form
      const email = getNativeElement<AuthOverviewComponent, HTMLInputElement>(
        fixture,
        '#email'
      );
      const password = getNativeElement<
        AuthOverviewComponent,
        HTMLInputElement
      >(fixture, '#password');
      email.value = user.email;
      password.value = '1234';
      execEvents([email, password], ['input', 'blur']);
      fixture.detectChanges();

      // Click on the login button to trigger a HTTP request
      const submit = getNativeElement<AuthOverviewComponent, HTMLButtonElement>(
        fixture,
        '#login-button'
      );
      submit.click();
      fixture.detectChanges();

      // Define the response of the HTTP request
      const req = httpTestingController.expectOne(service.LOGIN_PATH);
      const error = new HttpErrorResponse({ status: 406 });
      req.flush('Ivalid Credentials', error);
      fixture.detectChanges();

      // Proof if error component shows up
      const errorComp = getComponent<
        AuthOverviewComponent,
        SmallErrorMsgComponent
      >(fixture, SmallErrorMsgComponent);
      expect(errorComp).toBeTruthy();
      expect(component.error).toBe(errorComp.componentInstance.message);
    }));

    it('I-Test: Completely unsuccessful reset password process by getting HTTP-Error on posting email', fakeAsync(() => {
      // Click on the login button to get the login form
      const loginButton = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#login');
      loginButton.click();
      tick(100);
      fixture.detectChanges();

      // Click on the forget password button
      const forgetPwdButton = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#forget-pwd');
      forgetPwdButton.click();
      tick(100);
      fixture.detectChanges();

      // Add an email address where the security code should be sent
      const email = getNativeElement<AuthOverviewComponent, HTMLInputElement>(
        fixture,
        '#email'
      );
      const submitEmail = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#send-code-button');
      email.value = user.email;
      execEvents([email], ['input', 'blur']);
      submitEmail.click();

      // Define HTTP request
      const postEmailReq = httpTestingController.expectOne(
        service.CODE_PATH,
        'Post email address request'
      );
      const error = new HttpErrorResponse({ status: 404 });
      postEmailReq.flush('Resource not found', error);
      fixture.detectChanges();

      // Proof if error component shows up
      const errorComp = getComponent<
        AuthOverviewComponent,
        SmallErrorMsgComponent
      >(fixture, SmallErrorMsgComponent);
      expect(errorComp).toBeTruthy();
      expect(component.error).toBe(errorComp.componentInstance.message);
    }));

    it('I-Test: Completely unsuccessful reset password process by getting HTTP-Error on posting security code', fakeAsync(() => {
      // Click on the login button to get the login form
      const loginButton = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#login');
      loginButton.click();
      tick(100);
      fixture.detectChanges();

      // Click on the forget password button
      const forgetPwdButton = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#forget-pwd');
      forgetPwdButton.click();
      tick(100);
      fixture.detectChanges();

      // Add an email address where the security code should be sent
      const email = getNativeElement<AuthOverviewComponent, HTMLInputElement>(
        fixture,
        '#email'
      );
      const submitEmail = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#send-code-button');
      email.value = user.email;
      execEvents([email], ['input', 'blur']);
      submitEmail.click();

      // Define HTTP request
      const postEmailReq = httpTestingController.expectOne(
        service.CODE_PATH,
        'Post email address request'
      );
      postEmailReq.flush(user.email);
      fixture.detectChanges();

      // Set code
      const codeFields = getNativeElements<
        AuthOverviewComponent,
        HTMLInputElement
      >(fixture, 'input');
      const submitCodeButton = getNativeElement<
        AuthOverviewComponent,
        HTMLButtonElement
      >(fixture, '#proof-code-button');
      for (const field of codeFields) {
        field.value = '1';
      }
      execEvents([...codeFields], ['input', 'blur']);
      submitCodeButton.click();

      // Define HTTP request
      const postCodeReq = httpTestingController.expectOne(
        service.CODE_PATH,
        'Post security code request'
      );
      const error = new HttpErrorResponse({ status: 500 });
      postCodeReq.flush('Server error', error);
      fixture.detectChanges();

      // Proof if error component shows up
      const errorComp = getComponent<
        AuthOverviewComponent,
        SmallErrorMsgComponent
      >(fixture, SmallErrorMsgComponent);
      expect(errorComp).toBeTruthy();
      expect(component.error).toBe(errorComp.componentInstance.message);
    }));
  });
});
