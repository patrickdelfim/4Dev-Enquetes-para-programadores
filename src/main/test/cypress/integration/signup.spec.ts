import faker from '@faker-js/faker'
import * as FormHelper from '../support/form-helper'
import * as Http from '../support/signup-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('name').type(faker.name.findName())
  cy.getByTestId('email').type(faker.internet.email())
  const password = faker.internet.password(7)
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)
  cy.getByTestId('submit').click()
}
describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('should load with correct initial state ', () => {
    FormHelper.testInputStatus('name', 'Campo obrigatorio')
    FormHelper.testInputStatus('email', 'Campo obrigatorio')
    FormHelper.testInputStatus('password', 'Campo obrigatorio')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatorio')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('name', 'valor inválido')
    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'valor inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'valor inválido')
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('passwordConfirmation', 'valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if is valid', () => {
    cy.getByTestId('name').type(faker.name.findName())
    FormHelper.testInputStatus('name')
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')
    const password = faker.internet.password(5)
    cy.getByTestId('password').type(password)
    FormHelper.testInputStatus('password')
    cy.getByTestId('passwordConfirmation').type(password)
    FormHelper.testInputStatus('passwordConfirmation')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present EmailInUseError on 403', () => {
    Http.mockEmailInUseError()
    simulateValidSubmit()
    FormHelper.testMainError('Esse e-mail já esta em uso')
    FormHelper.testUrl('/signup')
  })
})
