import React from "react";
import { render, fireEvent, waitFor} from "@testing-library/react";
import Login from '.';
import {AuthContextProvider} from '../../contexts/auth';
import { createMemoryHistory } from "history";

const Setup = (props) => {
    return (
        <AuthContextProvider>
            <Login {...props} />
        </AuthContextProvider>
    )
}

describe('<Login />', () => {
    test('has email and password inputs', () => {
        const elrender = render(<Setup />);
        const emailInput = elrender.container.querySelector("input[name='email'");
        const passwordInput = elrender.container.querySelector("input[name='password'");
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    })

    test('input placeholder texts are present', () => {
        const elrender = render(<Setup />);
        const emailInput = elrender.container.querySelector("input[name='email'");
        const passwordInput = elrender.container.querySelector("input[name='password'");
        expect(emailInput.placeholder).toBe('Email')
        expect(passwordInput.placeholder).toBe('Password')
    })


    test('has submit button', () => {
        const elrender = render(<Setup />);
        const button = elrender.container.querySelector('input[type=submit]')
        expect(button).toBeInTheDocument()
    })

    test('email input change', async () => {
        const elrender = render(<Setup />);
        const emailInput = elrender.container.querySelector("input[name='email'");
        fireEvent.change(emailInput, {target: {value: 'test@gmail.com'}})
        await waitFor(()=>{
            expect(emailInput.value).toBe('test@gmail.com')
        })
    })

    test('password input change', async () => {
        const elrender = render(<Setup />);
        const emailInput = elrender.container.querySelector("input[name='password'");
        fireEvent.change(emailInput, {target: {value: 'test123'}})
        await waitFor(()=>{
            expect(emailInput.value).toBe('test123')
        })
    })


    test('has submit button licked', () => {
        const history = createMemoryHistory()
        const elrender = render(<Setup history={history} />);
        const button = elrender.container.querySelector('input[type=submit]')
        fireEvent.click(button)
        expect(history.location.pathname).toBe('/')
        
    })

   

})