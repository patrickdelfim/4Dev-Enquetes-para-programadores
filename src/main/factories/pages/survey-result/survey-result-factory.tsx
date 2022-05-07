import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases'
import React from 'react'
import { useParams } from 'react-router-dom'

export const MakeSurveyResult: React.FC = () => {
  const { id } = useParams()
  return (
    <SurveyResult
    loadSurveyResult={makeRemoteLoadSurveyResult(id)}
    />
  )
}