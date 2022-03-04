import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClientAdapter } from '@/main/factories/http/axios-http-client-adapter-factory'
import { AddAccount } from '@/domain/usecases'
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClientAdapter())
}
