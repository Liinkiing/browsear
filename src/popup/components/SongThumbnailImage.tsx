import React from 'react'
import styled from 'styled-components'
import fallback from '~/assets/images/placeholder.jpg'
import { LocalSong } from '~popup/stores/SongStore'

interface Props {
  readonly song: LocalSong
}

const SIZE = '120px'

const SongThumbnailImageInner = styled.img`
  height: ${SIZE};
  max-height: ${SIZE};
  max-width: ${SIZE};
  min-height: ${SIZE};
  min-width: ${SIZE};
  object-fit: cover;
  width: ${SIZE};
`

const SongThumbnailImage: React.FC<Props> = ({
  song: { thumbnail, title }
}) => {
  return thumbnail ? (
    <SongThumbnailImageInner src={thumbnail} alt={title} />
  ) : (
    <SongThumbnailImageInner src={fallback} alt={title} />
  )
}

export default SongThumbnailImage
