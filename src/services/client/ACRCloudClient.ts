import { IdentifyRoot } from '~/@types/api/acrcloud'

const BASE_URI = 'https://extension.doreso.com/v1'

export default new (class ACRCloudClient {
  public identify = async (
    sample: BlobEvent,
    tabUrl: string
  ): Promise<IdentifyRoot> =>
    (
      await this.post('/aha-music/identify', {
        body: this.buildForm(sample, tabUrl)
      })
    ).json()

  private post = async (endpoint: string, init?: RequestInit) => {
    const request = new Request(`${BASE_URI}${endpoint}`, {
      ...init,
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01'
      },
      method: 'POST'
    })

    return await fetch(request)
  }

  private get = async (endpoint: string, init?: RequestInit) => {
    const request = new Request(`${BASE_URI}${endpoint}`, {
      ...init,
      method: 'GET'
    })

    return await fetch(request)
  }

  private buildForm = (sample: BlobEvent, tabUrl: string): FormData => {
    const form = new FormData()
    form.append('tab_url', tabUrl)
    form.append('token', 'no_login')
    form.append('sample_bytes', sample.data.size.toString())
    form.append('sample', sample.data)
    form.append(
      'browser_version',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
    )
    form.append('version', '0.4.2')
    form.append('app_id', 'dpacanjfikmhoddligfbehkpomnbgblf')
    return form
  }
})()
