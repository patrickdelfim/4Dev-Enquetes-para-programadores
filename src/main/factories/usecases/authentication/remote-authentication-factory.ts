import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClientAdapter } from '@/main/factories/http/axios-http-client-adapter-factory'
import { RemoteAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClientAdapter())
}
