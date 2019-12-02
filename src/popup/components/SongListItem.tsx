import React from 'react'
import styled from 'styled-components'
import SongThumbnailImage from '~popup/components/SongThumbnailImage'
import { LocalSong } from '~popup/stores/SongStore'

interface Props {
  readonly song: LocalSong
}

const SongListItemInner = styled.li`
  display: flex;
`

const SongListItem: React.FC<Props> = ({ song }) => {
  return (
    <SongListItemInner>
      <SongThumbnailImage song={song} />
      <h1>{song.title}</h1>
    </SongListItemInner>
  )
}

export default SongListItem
