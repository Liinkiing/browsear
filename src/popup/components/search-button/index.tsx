import React from 'react'
import { SearchButtonInner } from './styled'
import { variants } from './framer'
import { HTMLMotionProps } from 'framer-motion'

interface Props extends HTMLMotionProps<'div'> {
  readonly recording: boolean
  readonly fetchingMetadatas: boolean
}

const SearchButton: React.FC<Props> = ({
  recording,
  fetchingMetadatas,
  ...props
}) => {
  return (
    <SearchButtonInner
      disabled={fetchingMetadatas}
      recording={recording}
      {...props}
      initial={recording ? 'recording' : 'initial'}
      animate={recording ? 'recording' : 'initial'}
      variants={variants.SearchButtonInner}>
      {fetchingMetadatas
        ? 'Fetching metadata...'
        : recording
        ? 'Stop'
        : 'Record'}
    </SearchButtonInner>
  )
}

export default SearchButton
