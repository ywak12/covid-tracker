import {
  trigger, animate, style, group, animateChild, query, stagger, transition, state
} from '@angular/animations';


export const fadeIn = trigger('fadeIn',[
  transition(':enter', 
  [
    style({opacity: 0}),
    animate("1000ms ease-out", style({opacity: 1})), 
  ])
])

export const slideDownFadeIn = trigger('slideDownFadeIn',[
  transition(':enter', [
      style({
       opacity: 0,
       transform: 'translateY(-24px)'
     }),
    animate("333ms {{initialDelay}}s ease-out", 
      style({
       opacity: 1,
       transform: 'translateY(0px)'
     }))
  ], 
  {
    params: {initialDelay: '0'}  //Default Value needed
  })
])

export const revealOnScrollAnimation = trigger('sectionState',[
  state('false',style({
     opacity: 0,
     transform: 'translateY(-18px)'
     //position: 'relative',
   })),
   state('true',style({
     opacity: 1,
     transform:'translateY(18px)'
     //position:'relative',
     //top:0
   })),
  transition('false => true', [
    animate("0.5s 0.2s ease-out")
  ]),
  transition('true => false', [
    animate("0.5s 0.2s ease-out")
  ])
])