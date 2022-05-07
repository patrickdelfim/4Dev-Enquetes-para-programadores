import { ApiContext } from '@/presentation/context'
import { SurveyResult } from '@/presentation/pages'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { LoadSurveyResultSpy, mockAccountModel } from '@/domain/test'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const setCurrentAccountMock = jest.fn()
  render(<ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
    <Router location={history.location} navigator={history}>
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    </Router>
  </ApiContext.Provider>)

  return {
    loadSurveyResultSpy
  }
}
describe('SurveyResult Component', () => {
  test('should present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  test('should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })
})
