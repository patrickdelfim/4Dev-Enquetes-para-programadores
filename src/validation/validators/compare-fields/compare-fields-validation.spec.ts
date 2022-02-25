import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'
import faker from '@faker-js/faker'

const makeSut = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valueToCompare)
describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if compare is valid', () => {
    const valuetoCompare = faker.random.word()
    const sut = makeSut(valuetoCompare)
    const error = sut.validate(valuetoCompare)
    expect(error).toBeFalsy()
  })
})
