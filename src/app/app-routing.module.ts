import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthOverviewComponent } from './auth/auth-overview/auth-overview.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // TODO: Is there a smarter solution?
  {
    path: 'login',
    component: AuthOverviewComponent,
    children: [{ path: 'resetPassword', component: AuthOverviewComponent }],
  },
  { path: 'register', component: AuthOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
