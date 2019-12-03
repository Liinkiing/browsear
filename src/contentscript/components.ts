interface NotificationProps {
  readonly content: string
  readonly duration?: number
  readonly type: 'info' | 'success' | 'error'
}

export const notification = ({
  content,
  duration = 2000,
  type
}: NotificationProps): HTMLDivElement => {
  const root = document.createElement('div')
  root.className = 'notification ' + type
  root.innerHTML = `${content}`
  root.addEventListener('animationend', ev => {
    if (ev.animationName === 'disappear') {
      root.remove()
    }
  })
  setTimeout(() => {
    root.style.animation = 'disappear 1s forwards'
  }, duration)

  return root
}
