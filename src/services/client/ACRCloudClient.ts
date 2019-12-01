import { IdentifyRoot } from '~/@types/api'

const BASE_URI = 'https://api.acrcloud.com/v1'

export default new class ACRCloudClient {

  public identify = async (sample: BlobEvent): Promise<IdentifyRoot> =>
    (await this.post('/aha-music/identify', {
      body: this.buildForm(sample)
    })).json()

  private post = async (endpoint: string, init?: RequestInit) => {
    const request = new Request(`${BASE_URI}${endpoint}`, { ...init, method: 'POST' })

    return await fetch(request)
  }

  private get = async (endpoint: string, init?: RequestInit) => {
    const request = new Request(`${BASE_URI}${endpoint}`, { ...init, method: 'GET' })

    return await fetch(request)
  }

  private buildForm = (sample: BlobEvent): FormData => {
    const form = new FormData()
    form.append('token', 'no_login')
    form.append('sample_bytes', sample.data.size.toString())
    form.append('sample', sample.data)
    form.append('app_id', 'dpacanjfikmhoddligfbehkpomnbgblf')
    return form
  }
}
