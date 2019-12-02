import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import styled, { Keyframes } from 'styled-components'
import { theme } from '~styles/themes'
import { disappearFromUp, slideInUp } from '~styles/keyframes'
import { Emitter } from '~/popup'
import { useTimeout } from '~popup/hooks/useTimeout'
import { UIEvents } from '~/enums'

export interface Notification {
  id: string
  type: 'info' | 'success' | 'error'
  duration?: number
  content: string
}

type Props = Notification

type StyledProps = Pick<Props, 'type'> & { animation: Keyframes }

const NotificationInner = styled.div<StyledProps>`
  animation: ${props => props.animation} 0.3s forwards ease-in-out;
  background: ${props => theme(props).colors.notifications[props.type]};
  border-radius: ${props => theme(props).borderRadius};
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.21);
  color: whitesmoke;
  line-height: 18px;
  margin: 10px 0;
  padding: 26px;
  pointer-events: all;
  position: relative;
  width: 80%;
`

const Notification: React.FC<Props> = ({ duration, content, id, ...props }) => {
  const [display, setDisplay] = useState(true)
  const [show, setShow] = useState(true)
  const container = useRef<HTMLDivElement>(null)
  useTimeout(
    () => {
      setShow(false)
    },
    duration!,
    []
  )

  useEffect(() => {
    const endHandler = (evt: AnimationEvent) => {
      if (evt.animationName === disappearFromUp.getName()) {
        setDisplay(false)
      }
    }

    if (container.current) {
      container.current.addEventListener('animationend', endHandler)
    }

    return () => {
      if (container.current) {
        container.current.removeEventListener('animationend', endHandler)
      }
    }
  }, [])

  if (!display) {
    Emitter.emit(UIEvents.NotificationHide, id)
    return null
  }

  return (
    <NotificationInner
      {...props}
      id={id}
      ref={container}
      animation={show ? slideInUp : disappearFromUp}>
      {content}
    </NotificationInner>
  )
}

Notification.defaultProps = {
  duration: 2000
}

export default Notification
