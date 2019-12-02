import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components'

export const breakpoint = (
  size: 'mobile' | 'tablet' | 'desktop',
  innerCss: FlattenSimpleInterpolation | TemplateStringsArray | CSSObject
): FlattenSimpleInterpolation | TemplateStringsArray => {
  let px
  switch (size) {
    case 'mobile':
      px = 320
      break
    case 'tablet':
      px = 768
      break
    case 'desktop':
      px = 992
      break
  }

  return css`
    @media screen and (min-width: ${px}px) {
      ${innerCss}
    }
  `
}

export const customScrollbar = css`
  &::-webkit-scrollbar {
    width: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 6px;
    position: absolute;
  }
`
