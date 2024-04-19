import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-overview/login/login.component';
import { RegisterComponent } from './auth-overview/register/register.component';
import { NgModule } from '@angular/core';
import { GetCodeComponent } from './auth-overview/get-code/get-code.component';
import { SetCodeComponent } from './auth-overview/set-code/set-code.component';

export const loginPath = 'login';
export const registerPath = 'register';
export const getCodePath = 'getAccessCode';
export const setCodePath = 'setAccessCode';

export const authRoutes: Routes = [
  {
    path: loginPath,
    component: LoginComponent,
    children: [
      { path: getCodePath, component: GetCodeComponent },
      { path: setCodePath, component: SetCodeComponent },
    ],
  },
  { path: registerPath, component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
