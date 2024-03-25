import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  /* This array saves the IDs of all shown icons */
  icons: Array<{ id: string }> = [];
  /* The number of icons which should be displayed */
  number = 4;

  ngOnInit(): void {
    // Create the IDs
    for (let i = 0; i <= this.number; i++) {
      this.icons.push({ id: 'icon-' + i });
    }
  }
}
