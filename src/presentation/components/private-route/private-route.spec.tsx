import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Route, Router, Routes } from 'react-router-dom'
import PrivateRoute from './private-route'
import { SurveyList } from '@/presentation/pages'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: ['/']
  })
  render(
    <Router location={history.location} navigator={history}>
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<SurveyList />} />
          </Route>
        </Routes>
    </Router>
  )

  return {
    history
  }
}

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/login')
  })
})
