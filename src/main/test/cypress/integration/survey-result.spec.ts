import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockSuccess = (): Cypress.Chainable => cy.fixture('survey-result').then(fix => Http.mockOk(path, 'GET', fix))
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => Helper.SetLocalStorageItem('account', account))
  })

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
  })

  it('should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.getByTestId('question').should('exist')
  })

  it('should logou on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('/surveys/any_id')
    Helper.testUrl('/login')
  })
})
