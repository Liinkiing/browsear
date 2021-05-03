import cheerio, { Root } from 'cheerio'

export default class ACRPageParser {
  private $: Root

  constructor(html: string) {
    this.$ = cheerio.load(html)
  }

  public getSpotifyId = (): string | null => {
    const $element = this.$('[href^="https://open.spotify.com/track"]')
    if ($element.first().length > 0) {
      const href = $element.first().attr('href')
      if (href) {
        return href.split('/').pop() || null
      }
      return null
    }
    return null
  }

  public getDeezerId = (): string | null => {
    const $element = this.$('[href^="https://www.deezer.com/fr/track"]')
    if ($element.first().length > 0) {
      const href = $element.first().attr('href')
      if (href) {
        return href.split('/').pop() || null
      }
      return null
    }
    return null
  }

  public getYoutubeId = (): string | null => {
    const $element = this.$('[href^="https://www.youtube.com/watch"]')
    if ($element.first().length > 0) {
      const href = $element.first().attr('href')
      if (href) {
        const videoId = new URL(href).searchParams.get('v')
        if (videoId === 'undefined') {
          // aha music, when ssr'd, does not return a youtube video id in the url...
          return null
        }
        return videoId || null
      }
      return null
    }
    return null
  }
}
