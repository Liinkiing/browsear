import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import SongList from './components/SongList'
import GlobalStyle from '~styles/global'
import useAppStore from '~popup/hooks/useAppStore'
import { AppTheme } from '~/enums'
import { dark, light } from '~styles/themes'
import { observer } from 'mobx-react-lite'

interface Props {}

const PopupApp: React.FC<Props> = () => {
  const { theme, toggleTheme } = useAppStore()

  return (
    <>
      <ThemeProvider theme={theme === AppTheme.Dark ? dark : light}>
        <GlobalStyle />
        <PopupAppInner>
          <button onClick={toggleTheme}>toggle theme</button>
          <SongList />
        </PopupAppInner>
      </ThemeProvider>
    </>
  )
}

const PopupAppInner = styled.div`
  align-items: center;
  display: flex;
  height: 500px;
  justify-content: center;
  width: 400px;
`

export default observer(PopupApp)
