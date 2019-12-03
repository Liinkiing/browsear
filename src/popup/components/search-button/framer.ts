import { Variants } from 'framer-motion'

export const variants = {
  SearchButtonInner: {
    initial: {
      transition: {
        ease: 'circOut',
        duration: 0.1
      },
      borderRadius: '50%',
      width: 300,
      height: 300
    },
    recording: {
      transition: {
        ease: 'circIn',
        duration: 0.1
      },
      borderRadius: '0%',
      width: '100%',
      height: '100%'
    }
  } as Variants
}
