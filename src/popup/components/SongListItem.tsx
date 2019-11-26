import React from 'react'
import styled from 'styled-components'
import { MusicEntity } from '../../@types/api'

interface Props {
  readonly song: MusicEntity
}

const SongListItemInner = styled.div`
  
`

const SongListItem: React.FC<Props> = ({ song }) => {

  return (
    <SongListItemInner>
      <h1>{song.title}</h1>
    </SongListItemInner>
  )
}

export default SongListItem
