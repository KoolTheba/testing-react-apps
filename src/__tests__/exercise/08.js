// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

test('test counter hook with simple component', async () => {
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

function setup({initialProps} = {}){
  const result = {}
  function TestComponent() {
    result.current = useCounter(initialProps)
    return null
  }
  render(<TestComponent />)
  return result
}

test('allows customization of the initial count', () => {
  const result = setup({initialProps: {initialCount: 3, step: 1}})
  
  expect(result.current.count).toBe(3)
  act(() => result.current.increment())
  expect(result.current.count).toBe(4)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', () => {
  const result = setup({initialProps: {initialCount: 0, step: 2}})
  
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})