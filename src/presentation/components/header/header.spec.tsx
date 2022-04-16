import { Header } from '@/presentation/components'
import { render, fireEvent, screen } from '@testing-library/react'
import { ApiContext } from '@/presentation/context'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import React from 'react'
describe('Header Component', () => {
  test('should call SetCurrentAccount with null', () => {
    const setCurrentAccountMock = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }} >
        <Router location={history.location} navigator={history} >
          <Header />
        </Router>
      </ApiContext.Provider>
    )
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
