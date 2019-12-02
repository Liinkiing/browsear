import * as React from 'react'
import ReactDOM from 'react-dom'
import PopupApp from './PopupApp'
import { EventEmitter } from 'events'

export const Emitter = new EventEmitter()

ReactDOM.render(<PopupApp />, document.getElementById('popup-root'))
