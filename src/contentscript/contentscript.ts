import { uuid } from '~popup/utils'
import styles, { container } from './styles'
import * as components from './components'

;(() => {
  const id = uuid()
  const $notificationsContainer = document.createElement('div')
  $notificationsContainer.id = 'browsear' + id
  Object.assign($notificationsContainer.style, container)
  const $shadowRoot = $notificationsContainer.attachShadow({ mode: 'open' })
  const style = document.createElement('style')
  style.textContent = styles
  $shadowRoot.append(style)
  document.body.append($notificationsContainer)
  chrome.runtime.onMessage.addListener(message => {
    if (message.type === 'ON_BG_RECORDING_START') {
      $shadowRoot.prepend(
        components.notification({
          content: 'Started recording',
          type: 'info'
        })
      )
    } else if (message.type === 'ON_BG_RECORDING_STOP') {
      const { match } = message.payload
      if (match) {
        const html = `
<img src="${match.thumbnail ||
          'https://icon-library.net/images/placeholder-image-icon/placeholder-image-icon-7.jpg'}"/>
<div class="notification__content">
<h1>${match.title}</h1>
<h2>${match.artist}</h2>
<p>Successfully found a match</p>
</div>
        `
        $shadowRoot.prepend(
          components.notification({
            content: html,
            type: 'success',
            duration: 4500
          })
        )
      } else {
        $shadowRoot.prepend(
          components.notification({
            content: 'No match found',
            type: 'error'
          })
        )
      }
    }
  })
})()
