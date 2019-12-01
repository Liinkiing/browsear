import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import useSongStore from '~popup/hooks/useSongStore'

interface Props {}

const SongListInner = styled.div``

const SongList: React.FC<Props> = () => {
  const { history } = useSongStore()
  return (
    <SongListInner>
      {history.map((song, i) =>
        <li key={`${i} - ${song.acr_id}`}>
          {song.title} ({song.artist})
        </li>
      )}
    </SongListInner>
  )
}

export default observer(SongList)
