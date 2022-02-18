import { EmailValidation } from '@/validation/validators/email/email-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from '@faker-js/faker'

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if email is valid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
