import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Route, Router, Routes } from 'react-router-dom'
import PrivateRoute from './private-route'
import { SurveyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/context'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: ['/']
  })
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }} >
      <Router location={history.location} navigator={history}>
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<SurveyList />} />
            </Route>
          </Routes>
      </Router>
    </ApiContext.Provider>
  )

  return {
    history
  }
}

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('should render current component if token is not empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})
