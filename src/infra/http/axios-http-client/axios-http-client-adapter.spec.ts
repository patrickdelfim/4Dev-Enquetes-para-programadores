import { AxiosHttpClientAdapter } from './axios-http-client-adapter'
import { mockPostRequest } from '@/data/test'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClientAdapter
  mockedAxios: jest.Mocked<typeof axios>
}
const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClientAdapter()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClientAdapter', () => {
  describe('post', () => {
    test('should call axios.post with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('should return the correct response on axios.post', () => {
      const { sut, mockedAxios } = makeSut()
      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })

    test('should return correct error on axios.post', () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
})
