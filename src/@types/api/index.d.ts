export interface IdentifyEndpoint {
  metadata: Metadata
  cost_time: number
  status: Status
  result_type: number
}

export interface Metadata {
  timestamp_utc: string
  music?: MusicEntity[] | null
}

export interface MusicEntity {
  label: string
  play_offset_ms: number
  duration_ms: number
  external_ids: ExternalIds
  artists?: ArtistsEntityOrAlbum[] | null
  result_from: number
  acrid: string
  title: string
  genres?: ArtistsEntityOrGenresEntityOrAlbum[] | null
  album: ArtistsEntityOrAlbum
  score: number
  external_metadata: ExternalMetadata
  release_date: string
}

export interface ExternalIds {
  isrc?: string | null
  upc?: string | null
}

export interface ArtistsEntityOrAlbum {
  name: string
  id?: string | null
}

export interface ArtistsEntityOrGenresEntityOrAlbum {
  name: string
}

export interface ExternalMetadata {
  youtube?: Youtube | null
  spotify?: Spotify | null
  deezer?: Deezer | null
}

export interface Youtube {
  vid: string
}

export interface Spotify {
  track: ArtistsEntityOrTrackOrAlbumOrGenresEntity
  artists?: ArtistsEntityOrTrackOrAlbumOrGenresEntity[] | null
  album: ArtistsEntityOrTrackOrAlbumOrGenresEntity
}

export interface ArtistsEntityOrTrackOrAlbumOrGenresEntity {
  id: string
  name?: string
}

export interface Deezer {
  track: Track
  artists?: ArtistsEntity[] | null
  album: Album
  genres?: GenresEntity[] | null
}

export interface Track {
  id: number | string
  name?: string
}

export interface ArtistsEntity {
  id: number | string
  name?: string
}

export interface Album {
  id: number | string
  name?: string
}

export interface GenresEntity {
  id: number | string
}

export interface Status {
  msg: string
  version: string
  code: number
}
