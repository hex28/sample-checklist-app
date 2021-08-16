import React from "react";
import { render, fireEvent, waitFor} from "@testing-library/react";
import Home from "./index";
import {AuthContextProvider, useAuthStore} from '../../contexts/auth';
import {CheckListContextProvider} from '../../contexts/checklist';

const ChangeAuthValues = ({children, values}: {children: React.ReactNode, values: Record<string, any>}) => {
  const {dispatch} = useAuthStore()

  React.useEffect(()=>{
    dispatch({
      type: 'auth',
      payload: {
          login: true,
          id: "1",
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

const dataSample = {
  email: "rachel.hughes@example.com",
  firstName: "Rachel",
  id: "c66434e4-e8ce-4e4f-9172-977c9a99c1e2",
  lastName: "Hughes",
  login: true,
  picture: {
    large: "https://randomuser.me/api/portraits/women/55.jpg", 
    medium: "https://randomuser.me/api/portraits/med/women/55.jpg", 
    thumbnail: "https://randomuser.me/api/portraits/thumb/women/55.jpg"
  }
}

describe('Header name', () => {
  test("render email if first and last name is undefind or null", () => {
    const elrender = render(<HomeComponent authValues={{...dataSample, firstName: '', lastName: ''}} />);
    const userDiv = elrender.container.querySelector('.user');
    expect(userDiv?.textContent).toBe(`${dataSample.email}`);
  })

  test("render first name with optional last name", () => {
    const elrender = render(<HomeComponent authValues={dataSample} />);
    const userDiv = elrender.container.querySelector('.user');
    expect(userDiv?.textContent).toBe(`${dataSample.firstName} ${dataSample.lastName}`);
  });
})


describe('Header image', () => {
  test("render image", ()=> {
    const elrender = render(<HomeComponent authValues={dataSample} />);
    const img = elrender.container.querySelector('img');
    expect(img).toBeInTheDocument()
    expect(img?.src).toBe(dataSample.picture.medium)
  })
})

describe('New Input Item', () => {
    test('Change input placeholder text', ()=> {
      const {baseElement} = render(<HomeComponent authValues={dataSample} />)
      let newInput = baseElement.querySelector('input[type=text]') as HTMLInputElement
      fireEvent.change(newInput, {target: {value: 'This is a test of the input'}})
      expect(newInput.value).toBe('This is a test of the input')
    })
})

describe('+ button', () => {
    test('+ button will be removed from document onclick', async() => {
      const {queryByText, findByText} = render(<HomeComponent authValues={dataSample} />)
      let plusBtn = await findByText('+')
      fireEvent.click(plusBtn)
      await waitFor(() => {
        expect(queryByText('+')).not.toBeInTheDocument()
      })
    })
})

describe('Add button', () => {
    test('Add button will create a new input', async() => {
      const {container, findByText} = render(<HomeComponent authValues={dataSample} />)
      let plusBtn = await findByText('+')
      let addButton = await findByText('Add')
      fireEvent.click(plusBtn)
      await waitFor(async () => {
        fireEvent.click(addButton)
        await waitFor(()=>{
          expect(container.querySelector('#checkbox-0')).toBeInTheDocument()
          expect(container.querySelector('.new-item')).toBeInTheDocument()
        })
      })
    })

    test('Add button will call alert if + button not clicked', async () => {
      const alert = window.alert
      window.alert = () => {}
      const spy = jest.spyOn(window, 'alert')
      const {findByText} = render(<HomeComponent authValues={dataSample} />)
      let addButton = await findByText('Add')
      fireEvent.click(addButton)
      expect(spy).toHaveBeenCalled()
      window.alert = alert
    })
})