// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

// allow args overrides
const buildLoginForm = build({
  fields: {
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password())
  }
})

test('submitting the form calls onSubmit with username and password', async () => {
  let submittedData
  const handleSubmit = data => (submittedData = data)
  
  render(<Login onSubmit={handleSubmit}/>)
  const usernameInput = screen.getByRole('textbox', {
    name: /username/i
  })
  const passwordInput =  screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})
  const username = 'myname'
  const password = 'mypassword'
  await userEvent.type(usernameInput, username)
  await userEvent.type(passwordInput, password)
  await userEvent.click(submitButton)
  
  expect(submittedData).toEqual({
    username,
    password
  })
})

test('submitting the form calls onSubmit with jest mock function', async () => {
  const handleSubmit = jest.fn();
  
  render(<Login onSubmit={handleSubmit}/>)
  const usernameInput = screen.getByRole('textbox', {
    name: /username/i
  })
  const passwordInput =  screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})
  const username = 'myname'
  const password = 'mypassword'
  await userEvent.type(usernameInput, username)
  await userEvent.type(passwordInput, password)
  await userEvent.click(submitButton)
  
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

test('submitting the form calls onSubmit with generated test data', async () => {
  const handleSubmit = jest.fn();
  
  render(<Login onSubmit={handleSubmit}/>)
  const usernameInput = screen.getByRole('textbox', {
    name: /username/i
  })
  const passwordInput =  screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})
  const {username, password} = buildLoginForm()
  
  await userEvent.type(usernameInput, username)
  await userEvent.type(passwordInput, password)
  await userEvent.click(submitButton)
  
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})


test('submitting the form calls onSubmit allowing data overrrides', async () => {
  const handleSubmit = jest.fn();
  
  render(<Login onSubmit={handleSubmit}/>)
  const usernameInput = screen.getByRole('textbox', {
    name: /username/i
  })
  const passwordInput =  screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})
  const {username, password} = buildLoginForm({password: 'abc'})
  
  await userEvent.type(usernameInput, username)
  await userEvent.type(passwordInput, password)
  await userEvent.click(submitButton)
  
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})