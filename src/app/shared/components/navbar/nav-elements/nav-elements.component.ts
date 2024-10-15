import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/auth/auth-overview/authentication.service';
import { loginPath } from 'src/app/auth/auth-routing-module';
import { deleteUser } from 'src/app/shared/stores/UserStore/User.actions';

@Component({
  selector: 'app-nav-elements',
  templateUrl: './nav-elements.component.html',
  styleUrl: './nav-elements.component.scss',
})
export class NavElementsComponent {
  @Input() public type: string = 'dashboard';
  @Input() public borderAnimation: boolean = false;

  public readonly text = {
    dashboard: 'Dashboard',
    finance: 'Haushaltsbuch',
    accounts: 'Konten',
    profile: 'Profil',
    settings: 'Einstellungen',
    logout: 'Logout',
  };

  constructor(
    private authService: AuthenticationService,
    private store: Store,
    private router: Router
  ) {}

  onLogout(): void {
    this.authService.deleteLogin().subscribe({
      next: () => {
        this.store.dispatch(deleteUser());
        this.router.navigate([loginPath]);
      },
      error: error => {
        // TODO: Show error
        console.log(error);
      },
    });
  }
}
