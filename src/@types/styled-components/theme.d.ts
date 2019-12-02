import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string

    colors: {
      primary: string
      secondary: string
      tint: string
      background: string
      text: string
      secondaryText: string
      notifications: {
        info: string
        success: string
        error: string
      }
    }
  }
}
