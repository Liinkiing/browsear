import { createGlobalStyle } from 'styled-components'
import bootstrap from '~styles/bootstrap'
import { theme } from '~styles/themes'

export default createGlobalStyle`
  ${bootstrap};

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  body {
    transition: background 0.3s, color 0.1s;
    background: ${props => theme(props).colors.background};
    color: ${props => theme(props).colors.text};
    font-family: 'Montserrat', 'Helvetica', 'Segoe UI', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    font-family: 'Montserrat', 'Helvetica', 'Segoe UI', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: all .3s;
    opacity: 0.8;
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
`
