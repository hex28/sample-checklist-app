import React, {createContext, useContext, useReducer} from 'react';
import {render} from '@testing-library/react'
import { AuthContextProvider, useAuthStore } from '.';

const SetUp = ({values}: {values: any}) => {

    return (
        <AuthContextProvider>
            <TestComponent  values={values} />
        </AuthContextProvider>
    )
}

const TestComponent = ({values}: {values: any}) => {

    const {state, dispatch} = useAuthStore()

    React.useEffect(()=>{
        dispatch({
            type: 'login',
            payload: values
        })
    }, [])

    return (<div>{JSON.stringify(state)}</div>)
}


test("change login to true", () => {
    const {getByText} = render(
        <SetUp values={{login: true}} />
    )
    expect(getByText(/{"login":true,"id":0,"firstName":"","lastName":"","email":""}/i)).toBeInTheDocument(); 
});

test("change id value to 2", () => {
    const {getByText} = render(<SetUp values={{id: 2}} />)
    expect(getByText(/{"login":false,"id":2,"firstName":"","lastName":"","email":""}/i)).toBeInTheDocument(); 
});

test("change firstName value to Alice", () => {
    const {getByText} = render(<SetUp values={{firstName: 'Alice'}} />)
    expect(getByText(/{"login":false,"id":0,"firstName":"Alice","lastName":"","email":""}/i)).toBeInTheDocument(); 
});

test("change lastName value to Smith", () => {
    const {getByText} = render(<SetUp values={{lastName: 'Smith'}} />)
    expect(getByText(/{"login":false,"id":0,"firstName":"","lastName":"Smith","email":""}/i)).toBeInTheDocument(); 
});

test("change email to alicesmith@gmail.com", () => {
    const {getByText} = render(<SetUp values={{email: 'alicesmith@gmail.com'}} />)
    expect(getByText(/{"login":false,"id":0,"firstName":"","lastName":"","email":"alicesmith@gmail.com"}/i)).toBeInTheDocument(); 
});

test("change login to true, id to 2, firstName to Alice, lastName to Smith, email to alicesmith@gmail.com", () => {
    const {getByText} = render(<SetUp values={{
        login: true,
        id: 2,
        firstName: "Alice",
        lastName: "Smith",
        email: "alicesmith@gmail.com"
    }} />)
    expect(getByText(/{"login":true,"id":2,"firstName":"Alice","lastName":"Smith","email":"alicesmith@gmail.com"}/i)).toBeInTheDocument(); 
});