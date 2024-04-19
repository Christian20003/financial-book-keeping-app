import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthOverviewComponent } from './auth-overview/auth-overview.component';
import { LoginComponent } from './auth-overview/login/login.component';
import { RegisterComponent } from './auth-overview/register/register.component';
import { InvalidInputComponent } from '../shared/components/invalid-input/invalid-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SmallErrorMsgComponent } from '../shared/components/small-error-msg/small-error-msg.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { AuthRoutingModule } from './auth-routing-module';
import { HttpClientModule } from '@angular/common/http';
import { GetCodeComponent } from './auth-overview/get-code/get-code.component';
import { SetCodeComponent } from './auth-overview/set-code/set-code.component';

@NgModule({
  declarations: [
    AuthOverviewComponent,
    LoginComponent,
    RegisterComponent,
    InvalidInputComponent,
    SmallErrorMsgComponent,
    LoadingComponent,
    GetCodeComponent,
    SetCodeComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule,
  ],
  exports: [AuthOverviewComponent],
})
export class AuthModule {}
