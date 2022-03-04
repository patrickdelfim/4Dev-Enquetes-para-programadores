import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type Factory = {
  MakeLogin: React.FC
  MakeSignUp: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div> OLA!!</div>} />
        <Route path="/login" element={<factory.MakeLogin />} />
        <Route path="/signup" element={<factory.MakeSignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
