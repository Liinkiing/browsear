import { DefaultTheme } from 'styled-components'
import base from '~styles/themes/base'

export const primary = '#00447b'
export const secondary = '#ef2f64'
export const tint = '#f2f3f4'
export const background = '#e8ebf3'
export const text = '#57585a'
export const secondaryText = '#e8ebf3'

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
