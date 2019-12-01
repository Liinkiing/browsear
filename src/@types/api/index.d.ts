export interface IdentifyRoot {
  status: number;
  msg: string;
  data: Song[];
}
export interface Song {
  acr_id: string;
  title: string;
  artist: string;
  deezer_id: string;
  spotify_id: string;
  youtube_id: string;
}
