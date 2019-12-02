import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import SongListItem from '~popup/components/SongListItem'
import useStores from '~popup/hooks/useStores'
import { motion } from 'framer-motion'

interface Props {}

const SongListInner = styled.ul`
  & li:not(:last-of-type) {
    margin-bottom: 20px;
  }
`

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 300
}

const SongList: React.FC<Props> = () => {
  const {
    song: { history, removeSong }
  } = useStores()
  return (
    <SongListInner>
      {history.map(song => (
        <motion.li
          layoutTransition={spring}
          key={`${song.acr_id}${song.requestedAt}`}>
          <SongListItem onDelete={removeSong} song={song} />
        </motion.li>
      ))}
    </SongListInner>
  )
}

export default observer(SongList)
