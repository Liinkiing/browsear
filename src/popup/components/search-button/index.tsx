import React from 'react'
import { SearchButtonInner } from './styled'
import { variants } from './framer'
import { HTMLMotionProps } from 'framer-motion'

interface Props extends HTMLMotionProps<'div'> {
  readonly recording: boolean
}

const SearchButton: React.FC<Props> = ({ recording, ...props }) => {
  return (
    <SearchButtonInner
      {...props}
      initial={recording ? 'recording' : 'initial'}
      animate={recording ? 'recording' : 'initial'}
      variants={variants.SearchButtonInner}>
      {recording ? 'Stop' : 'Request'} Recording
    </SearchButtonInner>
  )
}

export default SearchButton
