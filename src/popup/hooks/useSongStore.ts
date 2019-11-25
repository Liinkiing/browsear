import React from 'react'
import { SongContext } from '~popup/context'
import { SongStore } from '~popup/stores/SongStore'

const useSongStore = (): SongStore => React.useContext(SongContext)

export default useSongStore
