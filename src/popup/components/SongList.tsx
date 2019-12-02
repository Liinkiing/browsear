import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import useSongStore from '~popup/hooks/useSongStore'
import SongListItem from '~popup/components/SongListItem'

interface Props {}

const SongListInner = styled.ul``

const SongList: React.FC<Props> = () => {
  const { history } = useSongStore()
  return (
    <SongListInner>
      {history.map((song, i) => (
        <SongListItem key={`${i} - ${song.acr_id}`} song={song} />
      ))}
    </SongListInner>
  )
}

export default observer(SongList)
