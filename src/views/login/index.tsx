import { ChangeEvent, MouseEvent, useState } from "react"
import './styles.scss';
import {useAuthStore} from '../../contexts/auth';
import { useHistory } from "react-router";
import * as AuthRequest from '../../api/auth';


interface LoginTypes {
    email: string,
    password: string
}

const Login = (props:any) => {

    let history = useHistory();
    
    const [userInput, setUserInput] = useState<LoginTypes>({
        email: '',
        password: ''
    })

    const {dispatch} = useAuthStore()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            await AuthRequest.login(userInput.email, userInput.password)
            let profile = await AuthRequest.getUser()
            dispatch({
                type: 'auth',
                payload: {
                    login: true,
                    id: profile.login.uuid,
                    email: profile.email,
                    username: profile.login.username,
                    firstName: profile.name.first,
                    lastName: profile.name.last,
                    picture: profile.picture
    
                }
            })
            history.push('/')
        } catch (error) {
            alert('We encountered a problem :(. Please try again')
        }

    }

    return (
        <div>
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
            <div className="hint">
                <p>For this sample you can use any email/password combination :)</p>
            </div>
        </div>
    )
}

export default Login