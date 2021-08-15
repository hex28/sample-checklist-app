import {Auth, Action} from '../../types/contexts';

const initialState = {
    login: false
}


const AuthReducer = (state: Auth, action: Action) => {  
    switch (action.type) {
        case 'auth':
            return {
                ...state,
                ...action.payload
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

export {AuthReducer, initialState};