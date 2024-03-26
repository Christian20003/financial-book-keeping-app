import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  /* This array saves the IDs of all shown icons */
  icons: Array<{ id: string }> = [];
  /* The number of icons which should be displayed (IF CHANGED - also update SCSS file) */
  number = 5;

  ngOnInit(): void {
    // Create the IDs
    for (let i = 0; i < this.number; i++) {
      this.icons.push({ id: 'icon-' + i });
    }
  }
}
