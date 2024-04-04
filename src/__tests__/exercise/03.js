// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', async () => {
  render(<Counter />)

  const decrementButton = screen.getByRole('button', {name: /decrement/i})
  const incrementButton = screen.getByRole('button', {name: /increment/i})
  const message = screen.getByText('Current count:', {exact: false})
  expect(message).toHaveTextContent('Current count: 0')

  await userEvent.click(incrementButton)
  expect(message).toHaveTextContent('Current count: 1')

  await userEvent.click(decrementButton)
  expect(message).toHaveTextContent('Current count: 0')
})
