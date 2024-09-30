import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, DashboardOverviewComponent],
  imports: [CommonModule],
  exports: [DashboardOverviewComponent],
})
export class DashboardModule {}
