import { DefaultTheme } from 'styled-components'
import base from '~styles/themes/base'

export const primary = '#fcb139'
export const secondary = '#ffffff'
export const tint = '#f2f3f4'
export const background = '#57585a'
export const text = '#f2f3f4'
export const secondaryText = '#57585a'

const theme: DefaultTheme = {
  ...base,
  colors: {
    primary,
    secondary,
    tint,
    background,
    text,
    secondaryText
  }
}

export default theme
