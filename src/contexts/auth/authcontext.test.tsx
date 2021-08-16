import React from 'react';
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
            type: 'auth',
            payload: values
        })
    }, [values, dispatch])

    return (<div>{JSON.stringify(state)}</div>)
}


test("Context will the values if they fit the criteria", () => {
    const {getByText} = render(<SetUp values={{login: true, id: 0, firstName: 'Alice', lastName: "", email: ""}} />)
    expect(getByText(/{"login":true,"id":0,"firstName":"Alice","lastName":"","email":""}/i)).toBeInTheDocument(); 
});