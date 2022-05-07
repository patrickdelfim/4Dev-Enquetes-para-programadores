import { ApiContext } from '@/presentation/context'
import { SurveyResult } from '@/presentation/pages'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { mockAccountModel } from '@/domain/test'

describe('SurveyResult Component', () => {
  test('should present correct initial state', async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    render(<ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
    <Router location={history.location} navigator={history}>
      <SurveyResult />
    </Router>
  </ApiContext.Provider>)

    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
