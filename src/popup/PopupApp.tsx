import React, { useCallback, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from '~styles/global'
import { AppTheme } from '~/enums'
import { dark, light } from '~styles/themes'
import { observer } from 'mobx-react-lite'
import useStores from '~popup/hooks/useStores'
import SearchButton from '~popup/components/search-button'
import AppButton from '~popup/components/ui/AppButton'
import { FiList, FiMoon, FiSun } from 'react-icons/fi'
import AppToolbar from '~popup/components/AppToolbar'
import HistoryView from '~popup/views/history-view'
import useChromeOnMessage from '~popup/hooks/useChromeOnMessage'
import NotificationsContainer, {
  notify
} from '~popup/components/ui/notifications/NotificationsContainer'

interface Props {}

const SHOW_UNREAD_TIMEOUT = 3000

const PopupApp: React.FC<Props> = () => {
  const {
    song: {
      requestRecording,
      stopRecording,
      markUnreadAsRead,
      fetchingMetadatas,
      recording,
      hasUnreadMatches
    },
    app: { clearBadge, toggleTheme, theme }
  } = useStores()
  const onClick = useCallback(() => {
    if (fetchingMetadatas) return
    recording ? stopRecording() : requestRecording()
  }, [recording, fetchingMetadatas])
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
  useEffect(() => {
    if (hasUnreadMatches) {
      setShowHistory(hasUnreadMatches)
      setTimeout(() => {
        markUnreadAsRead()
        clearBadge()
      }, SHOW_UNREAD_TIMEOUT)
    }
  }, [hasUnreadMatches])

  return (
    <>
      <ThemeProvider theme={theme === AppTheme.Dark ? dark : light}>
        <NotificationsContainer />
        <GlobalStyle />
        <PopupAppInner>
          <ToggleThemeButton onClick={toggleTheme}>
            {theme === AppTheme.Light ? <FiMoon /> : <FiSun />}
          </ToggleThemeButton>
          <HistoryView
            isVisible={showHistory}
            onViewClose={() => {
              setShowHistory(history => !history)
            }}
          />
          <SearchButton
            fetchingMetadatas={fetchingMetadatas}
            recording={recording}
            onClick={onClick}
          />
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
  width: 500px;
`

const MainAppToolbar = styled(AppToolbar)`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  width: 100%;
`

const ToggleThemeButton = styled(AppButton)`
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 1000;
`

export default observer(PopupApp)
