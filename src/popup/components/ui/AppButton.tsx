import React from 'react'
import styled from 'styled-components'
import { theme } from '~styles/themes'
import { lighten } from 'polished'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  readonly disabled?: boolean
}

const AppButtonInner = styled.button`
  background: ${props => theme(props).colors.primary};
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  color: whitesmoke;
  display: flex;
  outline: none;
  padding: 10px 15px;
  transition: all 0.2s;
  &:hover {
    background: ${props => lighten(0.1, theme(props).colors.primary)};
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.35);
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    filter: grayscale(100%);
  }
`

const AppButton: React.FC<Props> = ({ children, ...props }) => (
  <AppButtonInner {...props}>{children}</AppButtonInner>
)

export default AppButton
