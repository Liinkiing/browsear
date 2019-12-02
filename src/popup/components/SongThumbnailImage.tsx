import React from 'react'
import styled from 'styled-components'
import fallback from '~/assets/images/placeholder.jpg'
import { LocalSong } from '~popup/stores/SongStore'
import { FiX } from 'react-icons/all'
import { shake } from '~styles/keyframes'

interface Props {
  readonly song: LocalSong
  readonly onDelete?: (song: LocalSong) => void
}

const SIZE = '120px'

const CloseIcon = styled(FiX)`
  color: whitesmoke;
  font-size: 2rem;
  left: calc(50% - 1rem);
  opacity: 0;
  position: absolute;
  top: calc(50% - 1rem);
  transform: scale(0);
  transition: all 0.3s;
  z-index: 1;
`

const SongThumbnailImageContainer = styled.div`
  max-width: ${SIZE};
  min-width: ${SIZE};
  position: relative;
  width: ${SIZE};
  z-index: 0;
  &:before {
    background: black;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: all 0.3s;
    z-index: 0;
  }
  &:hover {
    ${CloseIcon} {
      opacity: 1;
      transform: scale(1);
      &:hover {
        animation: ${shake} 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        backface-visibility: hidden;
        cursor: pointer;
        perspective: 1000px;
        transform: translate3d(0, 0, 0);
      }
    }
    &:before {
      opacity: 0.7;
    }
  }
`

const SongThumbnailImageInner = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`

const SongThumbnailImage: React.FC<Props> = ({ onDelete, song }) => {
  return (
    <SongThumbnailImageContainer>
      <SongThumbnailImageInner
        src={song.thumbnail || fallback}
        alt={song.title}
      />
      <CloseIcon
        {...(onDelete
          ? {
              onClick: () => {
                onDelete(song)
              }
            }
          : {})}
      />
    </SongThumbnailImageContainer>
  )
}

export default SongThumbnailImage
