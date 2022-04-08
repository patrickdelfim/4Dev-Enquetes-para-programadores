import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Route, Router, Routes } from 'react-router-dom'
import PrivateRoute from './private-route'
import { SurveyList } from '@/presentation/pages'
describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
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
    expect(history.location.pathname).toBe('/login')
  })
})
