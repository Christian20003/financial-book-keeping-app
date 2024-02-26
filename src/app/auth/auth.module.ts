import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthOverviewComponent } from './auth-overview/auth-overview.component';

@NgModule({
  declarations: [AuthOverviewComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [AuthOverviewComponent],
})
export class AuthModule {}
