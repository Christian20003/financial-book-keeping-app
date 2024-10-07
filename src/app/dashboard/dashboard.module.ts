import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

@NgModule({
  declarations: [DashboardOverviewComponent],
  imports: [CommonModule, NavbarComponent],
  exports: [DashboardOverviewComponent],
})
export class DashboardModule {}
