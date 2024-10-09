import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../stores/UserStore/User.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  imagePath: string = '';
  firstLetter: string = 'A';

  constructor(private store: Store) {
    const data = this.store.select(selectUser);
    data.subscribe(state => {
      this.imagePath = state.imagePath;
      if (state.name != '') {
        this.firstLetter = state.name.charAt(0);
      }
    });
  }
}
