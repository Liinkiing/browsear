import React from 'react'
import styled, { css } from 'styled-components'
import SongThumbnailImage from '~popup/components/SongThumbnailImage'
import { LocalSong } from '~popup/stores/SongStore'
import { FaSpotify, FaYoutube } from 'react-icons/fa'
import { darken } from 'polished'
import { theme } from '~styles/themes'
import { blink } from '~styles/keyframes'

interface Props {
  readonly song: LocalSong
  readonly onDelete?: (song: LocalSong) => void
}

const SongListItemInner = styled.li<{ isUnread: boolean }>`
  display: flex;
  transition: background 0.15s;
  &:hover {
    background: ${props => darken(0.2, theme(props).colors.secondary)};
    cursor: pointer;
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
      animation: ${blink} 1s infinite alternate;
    `}
`

const SpotifyIcon = styled(FaSpotify)`
  &:hover {
    color: #1ed761;
  }
`
const YoutubeIcon = styled(FaYoutube)`
  &:hover {
    color: #ff0000;
  }
`

const SongListItemContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const SongListItemActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding: 20px 10px 10px 20px;
  & > * {
    font-size: 1.5rem;
    margin-left: 20px;
  }
  ${SpotifyIcon}, ${YoutubeIcon} {
    transition: all 0.3s;
    &:hover {
      filter: drop-shadow(0 5px 15px black);
    }
  }
`

const SongListItem: React.FC<Props> = ({ song, onDelete }) => {
  return (
    <SongListItemInner isUnread={song.unread}>
      <SongThumbnailImage song={song} {...(onDelete ? { onDelete } : {})} />
      <SongListItemContent>
        <h2>{song.title}</h2>
        <h3>{song.artist}</h3>
        <SongListItemActions>
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
        </SongListItemActions>
      </SongListItemContent>
    </SongListItemInner>
  )
}

export default SongListItem
