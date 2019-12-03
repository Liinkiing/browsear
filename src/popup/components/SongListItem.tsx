import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'
import SongThumbnailImage from '~popup/components/SongThumbnailImage'
import { LocalSong } from '~popup/stores/SongStore'
import { FaSpotify, FaYoutube } from 'react-icons/fa'
import { lighten } from 'polished'
import { theme } from '~styles/themes'
import { highlight } from '~styles/keyframes'
import { default as DIcon } from '~popup/components/ui/icons/DeezerIcon'

interface Props {
  readonly song: LocalSong
  readonly onDelete?: (song: LocalSong) => void
}

const SongListItemInner = styled.div<{ isUnread: boolean }>`
  background: ${props => theme(props).colors.background};
  border-radius: 4px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.35);
  color: ${props => theme(props).colors.text};
  display: flex;
  overflow: hidden;
  transition: background 0.15s;
  &:hover {
    background: ${props => lighten(0.1, theme(props).colors.background)};
  }
  & h2 {
    padding-top: 10px;
  }
  & h2,
  h3 {
    padding-left: 10px;
  }
  & h3 {
    margin-top: 5px;
    opacity: 0.7;
  }
  ${props =>
    props.isUnread &&
    css`
      animation: ${highlight} 0.7s infinite alternate;
    `}
`

const SpotifyIcon = styled(FaSpotify).attrs({
  className: 'service-icon'
})`
  &:hover {
    color: #1ed761;
  }
`
const YoutubeIcon = styled(FaYoutube).attrs({
  className: 'service-icon'
})`
  &:hover {
    color: #ff0000;
  }
`
const DeezerIcon = styled(DIcon).attrs({
  className: 'service-icon'
})`
  &:hover {
    color: #63dbf7;
  }
`

const SongListItemContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const SongListItemActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding: 20px 10px 10px 10px;
  & > a {
    font-size: 1.5rem;
    margin-left: 20px;
  }
  & .service-icon {
    transition: all 0.3s;
    &:hover {
      filter: drop-shadow(0 5px 15px black);
    }
  }
`

const SongListItemMetadata = styled.span`
  font-size: 0.8rem;
  font-weight: 300;
  margin-left: 0;
  margin-right: auto;
`

const SongListItem: React.FC<Props> = ({ song, onDelete }) => {
  const locale = useMemo(
    () => window.navigator.language?.split('-')[0] || 'fr',
    [window.navigator.language]
  )
  const requestedAt = new Date(song.requestedAt)

  return (
    <SongListItemInner isUnread={song.unread}>
      <SongThumbnailImage song={song} {...(onDelete ? { onDelete } : {})} />
      <SongListItemContent>
        <h2>{song.title}</h2>
        <h3>{song.artist}</h3>
        <SongListItemActions>
          <SongListItemMetadata>
            {requestedAt.toLocaleDateString()} -{' '}
            {requestedAt.toLocaleTimeString()}
          </SongListItemMetadata>
          {song.spotify_id && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`spotify:track:${song.spotify_id}`}>
              <SpotifyIcon />
            </a>
          )}
          {song.youtube_id && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.youtube.com/watch?v=${song.youtube_id}`}>
              <YoutubeIcon />
            </a>
          )}
          {song.deezer_id && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.deezer.com/${locale}/track/${song.deezer_id}`}>
              <DeezerIcon />
            </a>
          )}
        </SongListItemActions>
      </SongListItemContent>
    </SongListItemInner>
  )
}

export default SongListItem
