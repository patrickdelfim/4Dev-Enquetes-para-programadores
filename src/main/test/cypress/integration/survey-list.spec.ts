import faker from '@faker-js/faker'
import * as Helper from '../support/helpers'
import * as Http from '../support/survey-list-mocks'

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.SetLocalStorageItem('account', { accessToken: faker.datatype.uuid(), name: faker.name.findName() })
  })
  it('should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
  })
})
