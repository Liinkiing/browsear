import React from 'react'
import styled, { css } from 'styled-components'
import { observer } from 'mobx-react-lite'
import SongListItem from '~popup/components/SongListItem'
import useStores from '~popup/hooks/useStores'
import { blink } from '~styles/keyframes'

interface Props {}

const SongListInner = styled.ul<{ hasUnreadMatches: boolean }>`
  ${props =>
    props.hasUnreadMatches &&
    css`
      & li:first-of-type {
        animation: ${blink} 1s infinite alternate;
      }
    `}
`

const SongList: React.FC<Props> = () => {
  const {
    song: { history, removeSong },
    app: { hasUnreadMatches }
  } = useStores()
  return (
    <SongListInner hasUnreadMatches={hasUnreadMatches}>
      {history.map(song => (
        <SongListItem
          onDelete={removeSong}
          key={`${song.acr_id}${song.requestedAt}`}
          song={song}
        />
      ))}
    </SongListInner>
  )
}

export default observer(SongList)
