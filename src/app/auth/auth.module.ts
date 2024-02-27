import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthOverviewComponent } from './auth-overview/auth-overview.component';
import { LoginComponent } from './auth-overview/login/login.component';
import { RegisterComponent } from './auth-overview/register/register.component';
import { InvalidInputComponent } from '../shared/components/invalid-input/invalid-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthOverviewComponent,
    LoginComponent,
    RegisterComponent,
    InvalidInputComponent,
  ],
  imports: [CommonModule, BrowserAnimationsModule, ReactiveFormsModule],
  exports: [AuthOverviewComponent],
})
export class AuthModule {}
