import React, { useCallback } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import SongList from './components/SongList'
import GlobalStyle from '~styles/global'
import { AppTheme } from '~/enums'
import { dark, light } from '~styles/themes'
import { observer } from 'mobx-react-lite'
import useStores from '~popup/hooks/useStores'

interface Props {}

const PopupApp: React.FC<Props> = () => {
  const { song: { requestRecording, stopRecording, recording, clear }, app: { toggleTheme, theme } } = useStores()
  const onClick = useCallback(() => {
    recording ? stopRecording() : requestRecording()
  }, [recording])

  return (
    <>
      <ThemeProvider theme={theme === AppTheme.Dark ? dark : light}>
        <GlobalStyle />
        <PopupAppInner>
          <button onClick={toggleTheme}>toggle theme</button>
          <button onClick={onClick}>{recording ? 'Stop' : 'Request'} Recording</button>
          <button onClick={clear}>Clear</button>
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
  overflow-y: auto;
  width: 400px;
`

export default observer(PopupApp)
