import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MakeLogin } from '@/main/factories/pages/login/login-factory'
import { MakeSignUp } from '@/main/factories/pages/signup/signup-factory'

const Router: React.FC = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SurveyList />} />
        <Route path="/login" element={<MakeLogin />} />
        <Route path="/signup" element={<MakeSignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
