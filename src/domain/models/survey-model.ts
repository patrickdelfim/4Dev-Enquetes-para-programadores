export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswerModel[]
  date: Date
  didAwnser: boolean
}

export type SurveyAnswerModel = {
  image?: string
  answer: string
}
