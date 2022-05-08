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

  it('should present survey result', () => {
    mockSuccess()
    cy.visit('/surveys/any_id')

    cy.getByTestId('question').should('have.text', 'Question')
    cy.getByTestId('day').should('have.text', '20')
    cy.getByTestId('month').should('have.text', 'out')
    cy.getByTestId('year').should('have.text', '2020')
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer')
      assert.equal(li.find('[data-testid="percent"]').text(), '70%')
      assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
    })
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_2')
      assert.equal(li.find('[data-testid="percent"]').text(), '30%')
      assert.notExists(li.find('[data-testid="image"]'))
    })
  })
})
