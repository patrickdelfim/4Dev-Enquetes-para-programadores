import { render, screen } from '@testing-library/react'
import { Calendar } from '@/presentation/components'
import React from 'react'

const makeSut = (date: Date): void => {
  render(<Calendar date={date}/>)
}
describe('Calendar Component', () => {
  test('should render with correct values', () => {
    makeSut(new Date('2020-01-10T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })

  test('should render with correct values', () => {
    makeSut(new Date('2019-05-03T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })
})
