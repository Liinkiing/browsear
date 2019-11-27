import { DefaultTheme } from 'styled-components'
import base from '~styles/themes/base'
import { lightGray, dark } from '~styles/modules/colors'

const theme: DefaultTheme = {
  ...base,
  colors: {
    background: lightGray,
    text: dark
  }
}

export default theme
