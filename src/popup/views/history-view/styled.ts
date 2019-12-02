import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '~styles/themes'
import AppButton from '~popup/components/ui/AppButton'

export const HistoryViewInner = styled(motion.div)`
  background: ${props => theme(props).colors.secondary};
  color: ${props => theme(props).colors.secondaryText};
  display: flex;
  flex-direction: column;
  height: 100%;
  position: fixed;
  width: 100%;
  z-index: 10;
`

export const CloseButton = styled(AppButton)``

export const ClearButton = styled(AppButton)`
  position: fixed;
  right: 80px;
  top: 20px;
`

export const HistoryHeader = styled.div<{ hasScrolled: boolean }>`
  align-items: center;
  display: flex;
  padding: 20px;
  transition: box-shadow 0.3s;
  ${CloseButton} {
    margin-right: 20px;
  }
  ${props =>
    props.hasScrolled &&
    css`
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 1;
    `}
`

export const HistoryContent = styled.div`
  overflow-y: auto;
  padding: 20px 40px;
`
