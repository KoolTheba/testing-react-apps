// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function SimpleCounterComponent (){
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      Current count: {count}
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<SimpleCounterComponent />)
  screen.debug()
  expect(screen.getByText(/current count/i)).toHaveTextContent(/Current count: 0/i)
  
  const decrementButton = screen.getByRole('button', {name: /decrement/i})
  const incrementButton = screen.getByRole('button', {name: /increment/i})

  await userEvent.click(incrementButton)
  expect(screen.getByText(/current count/i)).toHaveTextContent(/Current count: 1/i)


  await userEvent.click(decrementButton)
  expect(screen.getByText(/current count/i)).toHaveTextContent(/Current count: 0/i)

})