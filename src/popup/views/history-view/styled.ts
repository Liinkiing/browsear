import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '~styles/themes'
import AppButton from '~popup/components/ui/AppButton'

export const HistoryViewInner = styled(motion.div)`
  background: ${props => theme(props).colors.secondary};
  color: ${props => theme(props).colors.secondaryText};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  position: fixed;
  width: 100%;
  z-index: 10;
`

export const CloseButton = styled(AppButton)``

export const HistoryHeader = styled.div`
  align-items: center;
  display: flex;
  ${CloseButton} {
    margin-right: 20px;
  }
`

export const HistoryContent = styled.div`
  padding-top: 10px;
`
