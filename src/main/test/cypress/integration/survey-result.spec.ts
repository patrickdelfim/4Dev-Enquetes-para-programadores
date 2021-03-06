import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/surveys/

const mockLoadSuccess = (): Cypress.Chainable => cy.fixture('load-survey-result').then(fix => Http.mockOk(path, 'GET', fix))

describe('SurveyResult', () => {
  describe('load', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
    const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
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
      mockLoadSuccess()
      cy.getByTestId('reload').click()
      cy.getByTestId('question').should('exist')
    })

    it('should logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.visit('/surveys/any_id')
      Helper.testUrl('/login')
    })

    it('should present survey result', () => {
      mockLoadSuccess()
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

    it('should go to SurveyList on back button click', () => {
      cy.visit('/')
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
      cy.getByTestId('back-button').click()
      Helper.testUrl('/')
    })
  })

  describe('save', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path, 'PUT')
    const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'PUT')
    const mockSaveSuccess = (): Cypress.Chainable => cy.fixture('save-survey-result').then(fix => Http.mockOk(path, 'PUT', fix))

    beforeEach(() => {
      cy.fixture('account').then(account => Helper.SetLocalStorageItem('account', account))
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
    })

    it('should present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.visit('/surveys/any_id')
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
    })

    it('should logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.get('li:nth-child(2)').click()
      Helper.testUrl('/login')
    })

    it('should present survey result', () => {
      mockSaveSuccess()
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('question').should('have.text', 'Other Question')
      cy.getByTestId('day').should('have.text', '23')
      cy.getByTestId('month').should('have.text', 'mar')
      cy.getByTestId('year').should('have.text', '2022')
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'another_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '50%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'another_image')
      })
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'another_answer_2')
        assert.equal(li.find('[data-testid="percent"]').text(), '50%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })
  })
})
