import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClientAdapter } from '@/main/factories/http/axios-http-client-adapter-factory'
import { LoadSurveyList } from '@/domain/usecases'
import { RemoteLoadSurveyList } from '@/data/usecases'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAxiosHttpClientAdapter())
}
