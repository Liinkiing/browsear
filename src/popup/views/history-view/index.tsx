import React from 'react'
import { AnimatePresence, Variants } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import {
  CloseButton,
  HistoryContent,
  HistoryHeader,
  HistoryViewInner
} from './styled'
import SongList from '~popup/components/SongList'

interface Props {
  readonly onViewClose?: () => void
  readonly isVisible: boolean
}

const variants: Variants = {
  initial: {
    scale: 0.7,
    opacity: 0,
    y: '100%'
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0
  }
}

const HistoryView: React.FC<Props> = ({ isVisible, onViewClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <HistoryViewInner
          initial="initial"
          animate="visible"
          exit="initial"
          variants={variants}>
          <HistoryHeader>
            <CloseButton {...(onViewClose ? { onClick: onViewClose } : {})}>
              <FiX />
            </CloseButton>
            <h1>History</h1>
          </HistoryHeader>
          <HistoryContent>
            <SongList />
          </HistoryContent>
        </HistoryViewInner>
      )}
    </AnimatePresence>
  )
}

export default HistoryView
