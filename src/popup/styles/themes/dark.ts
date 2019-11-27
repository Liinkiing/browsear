import { DefaultTheme } from 'styled-components'
import base from '~styles/themes/base'
import { lightGray, dark } from '~styles/modules/colors'

const theme: DefaultTheme = {
  ...base,
  colors: {
    background: dark,
    text: lightGray
  }
}

export default theme
