import {Auth, Action} from '../../types/contexts';

const initialState = {
    login: false,
    id: 0,
    firstName: '',
    lastName: '',
    email: ''
}


const AuthReducer = (state: Auth, action: Action) => {  
    switch (action.type) {
        case 'login':
            return {
                ...state,
                ...action.payload
            }
            break;
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
            break;
    }
}

export {AuthReducer, initialState};