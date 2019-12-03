import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, Variants } from 'framer-motion'
import { FiTrash2, FiX } from 'react-icons/fi'
import {
  ClearButton,
  CloseButton,
  HistoryContent,
  HistoryHeader,
  HistoryViewInner
} from './styled'
import SongList from '~popup/components/SongList'
import { observer } from 'mobx-react-lite'
import { notify } from '~popup/components/ui/notifications/NotificationsContainer'
import useStores from '~popup/hooks/useStores'

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
  const {
    song: { clear, matchesCount, markUnreadAsRead },
    app: { clearBadge }
  } = useStores()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [y, setY] = useState(0)
  useEffect(() => {
    if (scrollRef.current && isVisible) {
      const handler = () => {
        setY(scrollRef.current!.scrollTop)
      }
      scrollRef.current.addEventListener('scroll', handler)

      return () => {
        if (scrollRef.current) {
          setY(0)
          scrollRef.current.scrollTop = 0
          scrollRef.current.removeEventListener('scroll', handler)
        }
      }
    }
  }, [isVisible])
  return (
    <AnimatePresence>
      {isVisible && (
        <HistoryViewInner
          key="view"
          initial="initial"
          animate="visible"
          exit="initial"
          onClick={() => {
            markUnreadAsRead()
            clearBadge()
          }}
          variants={variants}>
          <HistoryHeader hasScrolled={y > 0}>
            <CloseButton {...(onViewClose ? { onClick: onViewClose } : {})}>
              <FiX />
            </CloseButton>
            <ClearButton
              onClick={() => {
                clear()
                notify({
                  type: 'success',
                  content: 'Successfully cleared history'
                })
              }}
              disabled={matchesCount === 0}>
              <FiTrash2 />
            </ClearButton>
            <h1>History</h1>
          </HistoryHeader>
          <HistoryContent ref={scrollRef}>
            <SongList />
          </HistoryContent>
        </HistoryViewInner>
      )}
    </AnimatePresence>
  )
}

export default observer(HistoryView)
