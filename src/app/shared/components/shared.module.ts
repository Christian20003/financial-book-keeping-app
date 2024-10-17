import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidInputComponent } from './invalid-input/invalid-input.component';
import { LoadingComponent } from './loading/loading.component';
import { LogoComponent } from './logo/logo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SmallErrorMsgComponent } from './small-error-msg/small-error-msg.component';
import { NavElementsComponent } from './navbar/nav-elements/nav-elements.component';

@NgModule({
  declarations: [
    InvalidInputComponent,
    LoadingComponent,
    LogoComponent,
    NavbarComponent,
    SmallErrorMsgComponent,
    NavElementsComponent,
  ],
  imports: [CommonModule],
  exports: [
    InvalidInputComponent,
    LoadingComponent,
    LogoComponent,
    NavbarComponent,
    SmallErrorMsgComponent,
  ],
})
export class SharedModule {}
