import * as React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyle from '~styles/global'
import PopupApp from './PopupApp'

ReactDOM.render(
  <>
    <GlobalStyle />
    <PopupApp />
  </>,
  document.getElementById('popup-root')
)
