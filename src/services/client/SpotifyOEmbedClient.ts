import { SpotifyRoot } from '~/@types/api/spotify'

const BASE_URI = 'https://embed.spotify.com'

export default new (class SpotifyOEmbedClient {
  public oembed = async (trackId: string): Promise<SpotifyRoot> =>
    (await this.get(`/oembed?url=spotify:track:${trackId}`)).json()

  private get = async (endpoint: string, init?: RequestInit) => {
    const request = new Request(`${BASE_URI}${endpoint}`, {
      ...init,
      method: 'GET'
    })

    return await fetch(request)
  }
})()
