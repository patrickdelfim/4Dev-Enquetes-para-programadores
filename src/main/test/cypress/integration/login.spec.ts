import faker from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl
describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load with correct initial state ', () => {
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Campo obrigatorio')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Campo obrigatorio')

    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'Campo obrigatorio')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Campo obrigatorio')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
  it('should present error state if is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'valor inválido')
    cy.getByTestId('email-label').should('have.attr', 'title', 'valor inválido')

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'valor inválido')
    cy.getByTestId('password-label').should('have.attr', 'title', 'valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('email').should('not.have.attr', 'title')
    cy.getByTestId('email-label').should('not.have.attr', 'title')

    cy.getByTestId('password').type(faker.internet.password(5))

    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('password').should('not.have.attr', 'title')
    cy.getByTestId('password-label').should('not.have.attr', 'title')

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

  it('should present save accesstoken if valid cretendials are provided', () => {
    cy.intercept('POST',
      /login/,
      {
        statusCode: 200,
        body: {
          accessToken: faker.datatype.uuid()
        }
      })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('should present UnexpectedError if invalid data is returned', () => {
    cy.intercept('POST',
      /login/,
      {
        statusCode: 200,
        body: {
          invalidProperty: faker.datatype.uuid()
        }
      })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password(5)).type('{enter}')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should prevent multiple submits', () => {
    cy.intercept('POST',
      /login/,
      {
        statusCode: 200,
        body: {
          accessToken: faker.datatype.uuid()
        }
      }).as('request')
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password(5))
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('should not call submit if form is invalid', () => {
    cy.intercept('POST',
      /login/,
      {
        statusCode: 200,
        body: {
          accessToken: faker.datatype.uuid()
        }
      }).as('request')
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
