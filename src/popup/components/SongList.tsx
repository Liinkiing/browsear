import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import SongListItem from '~popup/components/SongListItem'
import useStores from '~popup/hooks/useStores'

interface Props {}

const SongListInner = styled.ul``

const SongList: React.FC<Props> = () => {
  const {
    song: { history, removeSong }
  } = useStores()
  return (
    <SongListInner>
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
