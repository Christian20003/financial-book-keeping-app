import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/index';
import { loginData } from './login/login.component';

const loginPath = 'localhost/test'; //'https://backend/login';
const registerPath = 'https://backend/register';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  onPostLogin(data: loginData) {
    return this.http.post<User>(loginPath, data);
  }
}
