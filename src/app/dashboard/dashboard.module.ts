import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';

@NgModule({
  declarations: [DashboardOverviewComponent],
  imports: [CommonModule],
  exports: [DashboardOverviewComponent],
})
export class DashboardModule {}
