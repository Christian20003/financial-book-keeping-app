import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [LogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
