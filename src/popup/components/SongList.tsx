import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import useSongStore from '../hooks/useSongStore'
import SongListItem from './SongListItem'

interface Props {

}

const SongListInner = styled.div`
  
`

const SongList: React.FC<Props> = () => {
  const { history } = useSongStore()
  console.log(history)
  return (
    <SongListInner>
      {history.map(song =>
        <SongListItem key={song.acrid} song={song}/>
      )}
    </SongListInner>
  )
}

export default observer(SongList)
