import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { RemoteSaveSurveyResult } from '@/data/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockSaveSurveyResultParams } from '@/domain/test'
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
  test('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResultModel()
    }
    const SaveSurveyResultParams = mockSaveSurveyResultParams()
    await sut.save(SaveSurveyResultParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
    expect(httpClientSpy.body).toBe(SaveSurveyResultParams)
  })

  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
