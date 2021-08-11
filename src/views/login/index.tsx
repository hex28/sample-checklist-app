import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import request from "../../api/request";
import './styles.scss';
import {useAuthStore} from '../../contexts/auth';
import { useHistory } from "react-router";
import * as AuthRequest from '../../api/auth';


interface Login {
    email: string,
    password: string
}

const Login = (props:any) => {

    let history = useHistory();
    
    const [userInput, setUserInput] = useState<Login>({
        email: '',
        password: ''
    })

    const {state: {firstName, lastName}, dispatch} = useAuthStore()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault()

        let user = await AuthRequest.login(userInput.email, userInput.password)
        dispatch({
            type: 'login',
            payload: {
                login: true,
                id: user.id,
                email: userInput.email,
                firstName: user.firstName,
                lastName: user.lastName

            }
        })
        history.push('/')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    email:
                    <input className="input" type="text" value={userInput.email} name="email" onChange={handleChange} placeholder={"Email"} />
                </label>
                <label>
                    password:
                    <input className="input" type="password" value={userInput.password} name="password" onChange={handleChange} placeholder={"Password"} />
                </label>
                <input className="submit" type="submit" value="Submit" />
            </form>
        </>
    )
}

export default Login