import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import useSongStore from './hooks/useSongStore'

interface Props {}

const PopupApp: React.FC<Props> = () => {
  const { count, increment, decrement } = useSongStore()
  return (
    <PopupAppInner>
      <button onClick={decrement}>-</button>I am the popup {count}
      <button onClick={increment}>+</button>
    </PopupAppInner>
  )
}

const PopupAppInner = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default observer(PopupApp)
