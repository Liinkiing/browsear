import React, { useCallback, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from '~styles/global'
import { AppTheme } from '~/enums'
import { dark, light } from '~styles/themes'
import { observer } from 'mobx-react-lite'
import useStores from '~popup/hooks/useStores'
import SearchButton from '~popup/components/search-button'
import AppButton from '~popup/components/ui/AppButton'
import { FiAirplay, FiList } from 'react-icons/fi'
import AppToolbar from '~popup/components/AppToolbar'
import HistoryView from '~popup/views/history-view'
import useChromeOnMessage from '~popup/hooks/useChromeOnMessage'
import NotificationsContainer, {
  notify
} from '~popup/components/ui/notifications/NotificationsContainer'

interface Props {}

const PopupApp: React.FC<Props> = () => {
  const {
    song: { requestRecording, stopRecording, recording, clear },
    app: { toggleTheme, theme }
  } = useStores()
  const onClick = useCallback(() => {
    recording ? stopRecording() : requestRecording()
  }, [recording])
  const [showHistory, setShowHistory] = useState(false)
  useChromeOnMessage(
    'MATCH_FOUND',
    ({
      payload: {
        match: { title, artist }
      }
    }) => {
      notify({
        content: `Successfully found "${title}" by "${artist}"`,
        type: 'success'
      })
      setShowHistory(true)
    }
  )
  useChromeOnMessage('NO_MATCH_FOUND', () => {
    notify({ content: 'No match found', type: 'error' })
  })

  return (
    <>
      <ThemeProvider theme={theme === AppTheme.Dark ? dark : light}>
        <NotificationsContainer />
        <GlobalStyle />
        <PopupAppInner>
          <ToggleThemeButton onClick={toggleTheme}>
            <FiAirplay />
          </ToggleThemeButton>
          {/*<button onClick={onClick}>{recording ? 'Stop' : 'Request'} Recording</button>*/}
          {/*<button onClick={clear}>Clear</button>*/}
          {/*<SongList />*/}
          <HistoryView
            isVisible={showHistory}
            onViewClose={() => {
              setShowHistory(history => !history)
            }}
          />
          <SearchButton recording={recording} onClick={onClick} />
          <MainAppToolbar>
            <AppButton
              onClick={() => {
                setShowHistory(history => !history)
              }}>
              <FiList />
            </AppButton>
          </MainAppToolbar>
        </PopupAppInner>
      </ThemeProvider>
    </>
  )
}

const PopupAppInner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 500px;
  justify-content: center;
  overflow-y: auto;
  width: 400px;
`

const MainAppToolbar = styled(AppToolbar)`
  bottom: 0;
  position: fixed;
  width: 100%;
`

const ToggleThemeButton = styled(AppButton)`
  left: 20px;
  position: fixed;
  top: 20px;
`

export default observer(PopupApp)
