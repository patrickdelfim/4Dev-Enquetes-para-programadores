import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyResult } from '@/data/usecases'
import faker from '@faker-js/faker'

type SutTypes = {
  httpGetClientSpy: HttpGetClientSpy
  sut: RemoteLoadSurveyResult
}
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
  return {
    httpGetClientSpy,
    sut
  }
}
describe('RemoteLoadSurveyResult', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
