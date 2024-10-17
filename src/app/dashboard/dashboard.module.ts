import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { SharedModule } from '../shared/components/shared.module';

@NgModule({
  declarations: [DashboardOverviewComponent],
  imports: [CommonModule, SharedModule],
  exports: [DashboardOverviewComponent],
})
export class DashboardModule {}
