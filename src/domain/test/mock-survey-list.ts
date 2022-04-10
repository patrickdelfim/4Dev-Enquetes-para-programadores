import faker from '@faker-js/faker'
import { SurveyModel } from '../models'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(4)
    }, {
      answer: faker.random.words(5)
    }
  ],
  date: faker.date.recent(),
  didAwnser: faker.datatype.boolean()
})

export const mockSurveyListModel = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()])
