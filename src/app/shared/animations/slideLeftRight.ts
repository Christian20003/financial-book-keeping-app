import { animate, animation, style } from '@angular/animations';

export const slideOut = animation([
  style({
    transform: 'translateX(0px)',
    opacity: 1,
  }),
  animate(
    '{{ time }} ease-in',
    style({
      transform: 'translateX({{ length }})',
      opacity: '0',
    })
  ),
]);

export const slideIn = animation([
  style({
    transform: 'translateX({{ length }})',
    opacity: '0',
  }),
  animate(
    '{{ time }} ease-out',
    style({
      transform: 'translateX(0px)',
      opacity: '1',
    })
  ),
]);
