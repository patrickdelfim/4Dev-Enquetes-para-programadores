import faker from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl
describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load with correct initial state ', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatorio')
      .should('contain.text', '🔴')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatorio')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present error state if is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'valor inválido')
      .should('contain.text', '🔴')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'valor inválido')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.getByTestId('password').type(faker.internet.password(5))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present InvalidCredentialsError on 401', () => {
    cy.intercept('POST',
      /login/,
      {
        statusCode: 401,
        body: {
          error: faker.random.words()
        }
      })

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })
  it('should present UnexpectedError on 400', () => {
    cy.intercept('POST',
      /login/,
      {
        statusCode: 400,
        body: {
          error: faker.random.words()
        }
      })

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
    cy.url().should('eq', `${baseUrl}/login`)
  })
})
