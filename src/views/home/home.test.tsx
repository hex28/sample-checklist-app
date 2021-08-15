import React from "react";
import { render, fireEvent, getByRole, findAllByLabelText} from "@testing-library/react";
import Home from "./index";
import {AuthContextProvider, useAuthStore} from '../../contexts/auth';
import {CheckListContextProvider} from '../../contexts/checklist';

const ChangeAuthValues = ({children, values}: {children: React.ReactNode, values: Record<string, any>}) => {
  const {state, dispatch} = useAuthStore()

  React.useEffect(()=>{
    dispatch({
      type: 'login',
      payload: {
          login: true,
          id: 1,
          ...values
      }
    })
  }, [])

  return (
    <>
      {children}
    </>
  )
}

const HomeComponent = ({authValues}: {authValues: any}) => {
  return (
    <AuthContextProvider>
      <ChangeAuthValues values={authValues}>
        <CheckListContextProvider>
          <Home />
        </CheckListContextProvider>
      </ChangeAuthValues>
    </AuthContextProvider>
  )
}

describe('Header name', () => {
  test("render email if first and last name is undefind or null", () => {
    const elrender = render(<HomeComponent authValues={{email: "test@gmail.com"}} />);
    const userDiv = elrender.container.querySelector('.user');
    expect(userDiv.textContent).toBe('test@gmail.com');
  })

  test("render first name with optional last name", () => {
    const elrender = render(<HomeComponent authValues={{email: "test@gmail.com", firstName: 'Alice', lastName: 'Smith'}} />);
    const userDiv = elrender.getByText(/Alice Smith/i);
    expect(userDiv.textContent).toBe('Alice Smith');
  });
})


describe('Add button', () => {
  test('Add button adds a new input on click', async () => {
     const {baseElement} = render(<HomeComponent authValues={{email: "test@gmail.com"}} />)
     const button = baseElement.querySelector('.btn-add') as HTMLButtonElement
     fireEvent.click(button)
     let newInput = baseElement.querySelector('input[type=text]') as HTMLInputElement
     let checkbox = baseElement.querySelector('input[type=checkbox]') as HTMLInputElement
     let span = baseElement.querySelector('input[type=text]').parentElement.querySelector('span')
     expect(newInput).toBeInTheDocument()
     expect(checkbox).toBeInTheDocument()
     expect(span).toBeInTheDocument()
  })

  test('Change input placeholder text', ()=> {
    const {baseElement} = render(<HomeComponent authValues={{email: "test@gmail.com"}} />)
    const button = baseElement.querySelector('.btn-add') as HTMLButtonElement
    fireEvent.click(button)
    let newInput = baseElement.querySelector('input[type=text]') as HTMLInputElement
    fireEvent.change(newInput, {target: {value: 'This is a test of the input'}})
    expect(newInput.value).toBe('This is a test of the input')
  })



})