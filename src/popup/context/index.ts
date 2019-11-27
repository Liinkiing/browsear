import React from 'react'
import { SongStore } from '~popup/stores/SongStore'
import { AppStore } from '~popup/stores/AppStore'

export const SongContext = React.createContext(new SongStore())
export const AppContext = React.createContext(new AppStore())
