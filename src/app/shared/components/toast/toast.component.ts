import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [
    trigger('testing', [
      transition(':enter', [
        group([
          query(':self', [
            style({
              height: '20px',
              transform: 'translateX(-2000px)',
            }),
            animate(
              '0.5s',
              style({
                transform: 'translateX(0)',
              })
            ),
            animate(
              '0.15s',
              style({
                height: '95%',
              })
            ),
          ]),
          query('.description', [
            style({
              transform: 'scale(0)',
            }),
            animate(
              '0.5s 0.7s',
              style({
                transform: 'scale(1)',
              })
            ),
          ]),
        ]),
      ]),
      transition(':leave', [
        style({
          height: '100%',
        }),
        animate(
          '0.5s',
          style({
            height: '20px',
          })
        ),
        /* group([
          query('.description', [
            style({
              transform: 'scale(1)'
            }),
            animate('0.5s', style({
              transform: 'scale(0)'
            }))
          ]),
          query(':self', [
            style({
              height: '100%',
              transform: 'translateX(0)',
            }),
            animate('0.15s 0.5s', style({
              height: '20px'
            })),
            animate('0.5s', style({
              transform: 'translateX(2000px)'
            })),
          ]),
        ]) */
      ]),
    ]),
  ],
})
export class ToastComponent {
  test = [1];
  value = 2;

  onAdd() {
    this.test.push(this.value);
    this.value++;
    setTimeout(() => {
      this.onRemove(this.value);
    }, 5000);
  }

  onRemove(value: number) {
    this.test.indexOf(value);
    this.test.splice(value, 1);
  }
}
