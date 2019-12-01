import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import useSongStore from '~popup/hooks/useSongStore'

interface Props {}

const SongListInner = styled.div``

const SongList: React.FC<Props> = () => {
  const { records } = useSongStore()
  return (
    <SongListInner>
      {records.map(record =>
        <li key={record}>record {record}
          <video controls>
            <source src={record}/>
          </video>
        </li>
      )}
    </SongListInner>
  )
}

export default observer(SongList)
