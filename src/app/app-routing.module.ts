import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthOverviewComponent } from './auth/auth-overview/auth-overview.component';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // TODO: Is there a smarter solution?
  {
    path: 'login',
    component: AuthOverviewComponent,
    children: [{ path: 'resetPassword', component: AuthOverviewComponent }],
  },
  { path: 'register', component: AuthOverviewComponent },
  // TODO: Replace components
  { path: 'dashboard', component: DashboardOverviewComponent },
  { path: 'finances', component: DashboardOverviewComponent },
  { path: 'accounts', component: DashboardOverviewComponent },
  { path: 'profile', component: DashboardOverviewComponent },
  { path: 'settings', component: DashboardOverviewComponent },
  { path: 'logout', component: DashboardOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
