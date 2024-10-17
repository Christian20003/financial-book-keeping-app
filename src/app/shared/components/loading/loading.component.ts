import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  public readonly message: InputSignal<string> = input('');
  public readonly text = {
    title: 'Laden...',
  };
}
