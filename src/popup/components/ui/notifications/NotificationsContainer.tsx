import * as React from 'react'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Notification as INotification } from './Notification'
import Notification from './Notification'
import { Emitter } from '~/popup'
import { UIEvents } from '~/enums'
import { uuid } from '~popup/utils'

const notificationsRoot = document.getElementById(
  'notifications'
) as HTMLDivElement

const NotificationsContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<
    Array<React.ReactElement<INotification>>
  >([])
  useEffect(() => {
    Emitter.on(UIEvents.NotificationShow, (notification: INotification) => {
      setNotifications(n => [
        ...n,
        <Notification key={notification.id} {...notification} />
      ])
      notificationsRoot.classList.add('visible')
    })
    Emitter.on(UIEvents.NotificationHide, (notification: INotification) => {
      setNotifications(n => {
        const filtered = n.filter(notif => notif.props.id !== notification.id)
        if (filtered.length === 0) {
          notificationsRoot.classList.remove('visible')
        }
        return filtered
      })
    })

    return () => {
      notificationsRoot.classList.remove('visible')
      Emitter.removeAllListeners(UIEvents.NotificationShow)
    }
  }, [])

  return ReactDOM.createPortal(notifications, notificationsRoot)
}

export const notify = (notification: Omit<INotification, 'id'>): void => {
  Emitter.emit(UIEvents.NotificationShow, { ...notification, id: uuid() })
}

export default NotificationsContainer
