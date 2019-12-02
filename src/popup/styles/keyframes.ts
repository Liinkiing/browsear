import { keyframes } from 'styled-components'

export const slideInUp = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

export const blink = keyframes`
  from {
    opacity: 0.3;
    background: bisque;
  }
  to {
    opacity: 1;
    background: transparent;
  }
`

export const disappearFromUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`
