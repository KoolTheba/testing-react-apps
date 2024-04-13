// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
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

test('test counter hook with simple component', async () => {
  render(<SimpleCounterComponent />)
  expect(screen.getByText(/current count/i)).toHaveTextContent(/Current count: 0/i)
  
  const decrementButton = screen.getByRole('button', {name: /decrement/i})
  const incrementButton = screen.getByRole('button', {name: /increment/i})

  await userEvent.click(incrementButton)
  expect(screen.getByText(/current count/i)).toHaveTextContent(/Current count: 1/i)

  await userEvent.click(decrementButton)
  expect(screen.getByText(/current count/i)).toHaveTextContent(/Current count: 0/i)
})

test('exposes the count and increment/decrement functions', () => {
  let result
  function SimpleCounterComponent (props){
    result = useCounter(props)
    return null
  }
  render(<SimpleCounterComponent />)
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})


test('allows customization of the initial count', () => {})



test('allows customization of the step', () => {})