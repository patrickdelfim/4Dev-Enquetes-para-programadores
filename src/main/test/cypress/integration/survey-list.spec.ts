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

  it('should logou on AccessDeniedError', () => {
    Http.mockAccessDeniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    const { name } = Helper.GetLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('should logout on logout link click', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    Helper.testUrl('/login')
  })
})
