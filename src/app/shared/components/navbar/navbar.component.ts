import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../stores/UserStore/User.selector';
import { moveDown } from '../..';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [moveDown],
})
export class NavbarComponent {
  imagePath: string = '';
  firstLetter: string = 'A';
  activeProfile: boolean = false;

  constructor(private store: Store) {
    const data = this.store.select(selectUser);
    data.subscribe(state => {
      this.imagePath = state.imagePath;
      if (state.name != '') {
        this.firstLetter = state.name.charAt(0);
      }
    });
  }

  onProfile() {
    this.activeProfile = !this.activeProfile;
  }
}
