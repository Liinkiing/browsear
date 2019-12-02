import React, { useEffect, useRef, useState } from 'react'
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
          variants={variants}>
          <HistoryHeader hasScrolled={y > 0}>
            <CloseButton {...(onViewClose ? { onClick: onViewClose } : {})}>
              <FiX />
            </CloseButton>
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

export default HistoryView
