import faker from '@faker-js/faker'
import * as FormHelper from '../support/form-helper'

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('SignUp')
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
})
