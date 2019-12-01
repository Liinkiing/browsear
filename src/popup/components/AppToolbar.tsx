import React from 'react'
import styled from 'styled-components'

const AppToolbarInner = styled.div`
  display: flex;
  padding: 20px;
`

const AppToolbar: React.FC = ({ children, ...props }) => {
  return <AppToolbarInner {...props}>{children}</AppToolbarInner>
}

export default AppToolbar
