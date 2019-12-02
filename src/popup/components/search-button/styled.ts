import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '~styles/themes'
import { blink } from '~styles/keyframes'
import { lighten } from 'polished'

export const SearchButtonInner = styled(motion.div).attrs<{
  recording: boolean
}>(props => ({
  className: props.recording ? 'is-recording' : null
}))<{ recording: boolean }>`
  transition: all 0.3s;
  align-items: center;
  background: ${props => theme(props).colors.primary};
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.18), 0 10px 20px rgba(0, 0, 0, 0.07);
  color: whitesmoke;
  cursor: pointer;
  display: flex;
  font-size: 30px;
  font-weight: 700;
  justify-content: center;
  text-align: center;
  user-select: none;
  &:hover:not(.is-recording) {
    transform: translateY(-10px);
    background: ${props => lighten(0.1, theme(props).colors.primary)};
    box-shadow: 0 15px 10px rgba(0, 0, 0, 0.28), 0 20px 24px rgba(0, 0, 0, 0.17);
  }
  &:active:not(.is-recording) {
    transform: translateY(-5px);
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.28), 0 15px 24px rgba(0, 0, 0, 0.17);
  }
  ${props =>
    props.recording &&
    css`
      animation: ${blink} 0.5s infinite alternate;
    `}
`
