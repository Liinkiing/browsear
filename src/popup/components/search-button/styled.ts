import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '~styles/themes'

export const SearchButtonInner = styled(motion.div)`
  align-items: center;
  background: ${props => theme(props).colors.primary};
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.18), 0 10px 20px rgba(0, 0, 0, 0.07);
  color: whitesmoke;
  cursor: pointer;
  display: flex;
  font-size: 30px;
  font-weight: 700;
  justify-content: center;
  text-align: center;
  transition: background 0.3s;
  user-select: none;
`
