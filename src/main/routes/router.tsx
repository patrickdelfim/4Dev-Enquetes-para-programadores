import { MakeLogin, MakeSignUp, MakeSurveyList, MakeSurveyResult } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/context'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
    value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}
      >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            <Route path="/" element={<MakeSurveyList />} />
            <Route path="/surveys/:id" element={<MakeSurveyResult />} />
          </Route>
          <Route path="/login" element={<MakeLogin />} />
          <Route path="/signup" element={<MakeSignUp />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
