import { default as dark } from './dark'
import { default as light } from './light'
import { DefaultTheme } from 'styled-components'

export const theme = <Props extends { theme: DefaultTheme }>(props: Props) =>
  props.theme

export { dark, light }
