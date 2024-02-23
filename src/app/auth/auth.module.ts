import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthOverviewComponent } from './auth-overview/auth-overview.component';

@NgModule({
  declarations: [AuthOverviewComponent],
  imports: [CommonModule],
  exports: [AuthOverviewComponent],
})
export class AuthModule {}
