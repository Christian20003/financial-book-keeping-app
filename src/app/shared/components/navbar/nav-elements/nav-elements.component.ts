import { Component, Input } from '@angular/core';

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
}
