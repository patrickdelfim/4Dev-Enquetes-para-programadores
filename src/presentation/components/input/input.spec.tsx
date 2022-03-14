import React from 'react'
import faker from '@faker-js/faker'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/context/form/form-context'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value ={{ state: {} }} >
        <Input name={fieldName} />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('should ', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field)
    const label = sut.getByTestId(`${field}-label`)
    fireEvent.click(label)
    expect(document.activeElement).toBe(input)
  })
})
