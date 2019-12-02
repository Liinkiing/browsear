import { DefaultTheme } from 'styled-components'
import base from '~styles/themes/base'

export const primary = '#fcb139'
export const error = '#e23156'
export const info = '#77abe2'
export const success = '#61c291'
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
    secondaryText,
    notifications: {
      error,
      info,
      success
    }
  }
}

export default theme
