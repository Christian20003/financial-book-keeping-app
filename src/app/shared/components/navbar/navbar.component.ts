import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../stores/UserStore/User.selector';
import { moveDown, moveLeftToRight } from '../..';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [moveDown, moveLeftToRight],
})
export class NavbarComponent {
  public imagePath: string = '';
  public firstLetter: string = '';
  public activeProfile: boolean = false;

  constructor(private store: Store) {
    const data = this.store.select(selectUser);
    data.subscribe(state => {
      this.imagePath = state.imagePath;
      if (state.name != '') {
        this.firstLetter = state.name.charAt(0);
      } else {
        this.firstLetter = 'A';
      }
    });
  }

  onProfile() {
    this.activeProfile = !this.activeProfile;
  }
}
