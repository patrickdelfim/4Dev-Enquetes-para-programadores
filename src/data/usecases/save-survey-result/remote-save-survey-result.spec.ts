import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { RemoteSaveSurveyResult } from '@/data/usecases'
import faker from '@faker-js/faker'

type SutTypes = {
  httpClientSpy: HttpClientSpy
  sut: RemoteSaveSurveyResult
}
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)
  return {
    httpClientSpy,
    sut
  }
}
describe('RemoteSaveSurveyResult', () => {
  test('should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResultModel()
    }
    await sut.save({
      answer: faker.random.word()
    })
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
  })
})
