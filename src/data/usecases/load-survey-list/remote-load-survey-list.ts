import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyList } from '@/domain/usecases'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveyList.Model[]>) {}

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    const response = await this.httpClient.request({ url: this.url, method: 'get' })
    const remoteSurveys = response.body || []
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveys.map((remoteSurvey) =>
          Object.assign(remoteSurvey, {
            date: new Date(remoteSurvey.date)
          })
        )
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      case HttpStatusCode.noContent:
        return []
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string
    question: string
    date: string
    didAnswer: boolean
  }
}
