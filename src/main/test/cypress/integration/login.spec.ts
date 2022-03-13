import faker from '@faker-js/faker'
import * as FormHelper from '../support/form-helper'
import * as Http from './login-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.internet.password(5))
  cy.getByTestId('submit').click()
}
describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load with correct initial state ', () => {
    FormHelper.testInputStatus('email', 'Campo obrigatorio')
    FormHelper.testInputStatus('password', 'Campo obrigatorio')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present error state if is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'valor inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')
    cy.getByTestId('password').type(faker.internet.password(5))
    FormHelper.testInputStatus('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError()
    simulateValidSubmit()
    FormHelper.testMainError('Credenciais inválidas')
    FormHelper.testUrl('/login')
  })
  it('should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Algo de errado aconteceu. tente novamente em breve.')
    FormHelper.testUrl('/login')
  })
  it('should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidData()
    simulateValidSubmit()
    FormHelper.testMainError('Algo de errado aconteceu. tente novamente em breve.')
    FormHelper.testUrl('/login')
  })
  it('should present save accesstoken if valid cretendials are provided', () => {
    Http.mockOk()
    simulateValidSubmit()
    cy.getByTestId('error-wrap').should('not.have.descendants')
    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('should prevent multiple submits', () => {
    Http.mockOk()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password(5))
    cy.getByTestId('submit').dblclick()
    FormHelper.testHttpCallsCount(1)
  })

  it('should not call submit if form is invalid', () => {
    Http.mockOk()
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    FormHelper.testHttpCallsCount(0)
  })
})
