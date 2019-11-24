import React from 'react'
import styled from 'styled-components'

interface Props {}

const PopupApp: React.FC<Props> = () => {
  return <PopupAppInner>I am the popup</PopupAppInner>
}

const PopupAppInner = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default PopupApp
