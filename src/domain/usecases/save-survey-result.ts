import { surveyResultModel } from '@/domain/models'

export interface SaveSurveyResult {
  save: (Params: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Model>
}

export namespace SaveSurveyResult {

  export type Params = {
    answer: string
  }

  export type Model = surveyResultModel
}
