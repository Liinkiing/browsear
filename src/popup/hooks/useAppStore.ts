import React from 'react'
import { AppContext } from '~popup/context'
import { AppStore } from '~popup/stores/AppStore'

const useAppStore = (): AppStore => React.useContext(AppContext)

export default useAppStore
