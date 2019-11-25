import React from 'react'
import { SongStore } from '~popup/stores/SongStore'

export const SongContext = React.createContext(new SongStore())
