import React from 'react'
import { AppContext, SongContext } from '~popup/context'
import { SongStore } from '~popup/stores/SongStore'
import { AppStore } from '~popup/stores/AppStore'

const useStores = (): {
  app: AppStore,
  song: SongStore
} => ({
  app: React.useContext(AppContext),
  song: React.useContext(SongContext),
})

export default useStores
