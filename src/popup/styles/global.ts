import { createGlobalStyle } from 'styled-components'
import bootstrap from '~styles/bootstrap'

export default createGlobalStyle`
  ${bootstrap};
  
  * {
    box-sizing: border-box;
  }
  
  html {
    font-size: 100%;
  }
  
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
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
