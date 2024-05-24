import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from 'src/app/shared';

describe('AuthenticationService - Unit Tests', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;
  const dummyUser = {
    id: 2,
    name: 'max',
    email: 'max.mustermann@moon.com',
    password: '123',
    imagePath: 'https://backend/test',
    session: {
      token: 'abcde',
      expire: 1000,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  /*-----------------------------------------------Successful-Requests-----------------------------------------------------------*/

  it('U-Test: should be created', () => {
    expect(service).toBeTruthy();
  });

  it('U-Test: A successful login request', () => {
    const data = {
      email: dummyUser.email,
      password: dummyUser.password,
    };

    service.postLogin(data).subscribe({
      next: response => {
        const user = response as User;
        expect(user.name).toBeTruthy();
        expect(user.id).toBeTruthy();
        expect(user.imagePath).toBeTruthy();
        expect(user.session).toBeTruthy();
        expect(user.email).toBeTruthy();
      },
    });

    const req = httpTestingController.expectOne(service.LOGIN_PATH);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  it('U-Test: A successful register request', () => {
    const data = {
      email: dummyUser.email,
      name: dummyUser.name,
      password: dummyUser.password,
    };

    service.postRegister(data).subscribe({
      next: response => {
        const user = response as User;
        expect(user.name).toBeTruthy();
        expect(user.id).toBeTruthy();
        expect(user.imagePath).toBeTruthy();
        expect(user.session).toBeTruthy();
        expect(user.email).toBeTruthy();
      },
    });

    const req = httpTestingController.expectOne(service.REGISTER_PATH);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  it('U-Test: A successful getLoginCode request', () => {
    service.getLoginCode(dummyUser.email).subscribe({
      next: response => {
        expect(response).toBeTruthy();
      },
    });

    const req = httpTestingController.expectOne(service.CODE_PATH);
    expect(req.request.method).toBe('POST');
    req.flush('Success');
  });

  it('U-Test: A successful setLoginCode request', () => {
    const data = {
      value1: 1,
      value2: 2,
      value3: 3,
      value4: 4,
      value5: 5,
      value6: 6,
    };

    service.setLoginCode(data).subscribe({
      next: response => {
        const user = response as User;
        expect(user.name).toBeTruthy();
        expect(user.id).toBeTruthy();
        expect(user.imagePath).toBeTruthy();
        expect(user.session).toBeTruthy();
        expect(user.email).toBeTruthy();
      },
    });

    const req = httpTestingController.expectOne(service.CODE_PATH);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyUser);
  });

  /*-----------------------------------------------Unsuccessful-Requests----------------------------------------------------------*/

  it('U-Test: A faulty login request', () => {
    const data = {
      email: dummyUser.email,
      password: dummyUser.password,
    };

    service.postLogin(data).subscribe({
      error: error => {
        expect(error).toBeTruthy();
        expect(error.message).toEqual(
          AuthenticationService.errorMsg.invalidCredentials
        );
      },
    });

    const req = httpTestingController.expectOne(service.LOGIN_PATH);
    expect(req.request.method).toBe('POST');
    req.flush(new Error(AuthenticationService.errorMsg.invalidCredentials));
  });

  it('U-Test: A faulty register request', () => {
    const data = {
      email: dummyUser.email,
      name: dummyUser.name,
      password: dummyUser.password,
    };

    service.postRegister(data).subscribe({
      error: error => {
        expect(error).toBeTruthy();
        expect(error.message).toEqual(AuthenticationService.errorMsg.notFound);
      },
    });

    const req = httpTestingController.expectOne(service.REGISTER_PATH);
    expect(req.request.method).toBe('POST');
    req.flush(new Error(AuthenticationService.errorMsg.notFound));
  });

  it('U-Test: A faulty getLoginCode request', () => {
    service.getLoginCode(dummyUser.email).subscribe({
      error: error => {
        expect(error).toBeTruthy();
        expect(error.message).toEqual(AuthenticationService.errorMsg.unknown);
      },
    });

    const req = httpTestingController.expectOne(service.CODE_PATH);
    expect(req.request.method).toBe('POST');
    req.flush(new Error(AuthenticationService.errorMsg.unknown));
  });

  it('U-Test: A faulty setLoginCode request', () => {
    const data = {
      value1: 1,
      value2: 2,
      value3: 3,
      value4: 4,
      value5: 5,
      value6: 6,
    };

    service.setLoginCode(data).subscribe({
      error: error => {
        expect(error).toBeTruthy();
        expect(error.message).toEqual(
          AuthenticationService.errorMsg.serverError
        );
      },
    });

    const req = httpTestingController.expectOne(service.CODE_PATH);
    expect(req.request.method).toBe('PUT');
    req.flush(new Error(AuthenticationService.errorMsg.serverError));
  });
});
