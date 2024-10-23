import { animate, group, keyframes, query, stagger, state, style, transition, trigger } from "@angular/animations";

export const routeTransition = trigger('routeAnimations', [
    transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }),
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0, transform: 'scaleY(0.1)', filter: 'brightness(0) contrast(0)' }),
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ 
              opacity: 0, 
              transform: 'scaleY(0.9)', 
              filter: 'brightness(0) contrast(0)'
            })),
          ], { optional: true }),
          query(':enter', [
            animate('1s ease-out', keyframes([
              style({ opacity: 0, transform: 'scaleY(0.1)', filter: 'brightness(0) contrast(0)', offset: 0 }),
              style({ opacity: 1, transform: 'scaleY(1.1)', filter: 'brightness(1.5) contrast(2)', offset: 0.3 }),
              style({ opacity: 1, transform: 'scaleY(0.9)', filter: 'brightness(1.1) contrast(1.5)', offset: 0.5 }),
              style({ opacity: 1, transform: 'scaleY(1)', filter: 'brightness(1) contrast(1)', offset: 1 }),
            ])),
          ], { optional: true }),
        ]),
      ]),
    ]);

export const loadingTransition = 
  trigger('logoAnimation', [
    transition(':enter', [
      animate('1s', keyframes([
        style({ transform: 'scale(0) rotate(0deg)', offset: 0 }),
        style({ transform: 'scale(1.2) rotate(360deg)', offset: 0.5 }),
        style({ transform: 'scale(1) rotate(720deg)', offset: 1 })
      ]))
    ])
]);

export const staggerTransition = trigger('staggerAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(50px)' }),
      stagger(100, [
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ], { optional: true }),
  ]),
]);

export const staggerEducationTransition = trigger('staggerAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateX(-50px)' }),
      stagger(200, [
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ], { optional: true }),
  ]),
]);

export const staggerProjectTransition = trigger('imageAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'scale(0.8)' }),
      stagger(100, [
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ], { optional: true }),
  ]),
]);

export const staggerPersonalTransition = trigger('fadeInAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),    
  ]),
]);

export const staggerAboutTransition = trigger('fadeInAnimationAbout', [
  transition(':enter', [
    query('.about-content, .about-image', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(300, [
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ])
    ])
  ]),
]);
            
    