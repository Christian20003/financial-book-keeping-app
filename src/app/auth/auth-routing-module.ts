import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-overview/login/login.component';
import { RegisterComponent } from './auth-overview/register/register.component';
import { NgModule } from '@angular/core';

export const loginPath = 'login';
export const registerPath = 'register';
export const forgotPasswordPath = 'forgotPassword';

const authRoutes: Routes = [
  {
    path: loginPath,
    component: LoginComponent,
    children: [
      // TODO: Add missing component
      { path: forgotPasswordPath, component: LoginComponent },
    ],
  },
  { path: registerPath, component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
