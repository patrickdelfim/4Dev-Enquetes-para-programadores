import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client/axios-http-client-adapter'

export const makeAxiosHttpClientAdapter = (): AxiosHttpClientAdapter => {
  return new AxiosHttpClientAdapter()
}
