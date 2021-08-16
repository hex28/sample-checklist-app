import React, {createContext, useReducer} from 'react';
import {Auth, Dispatch, ProviderProps} from '../../types/contexts';
import {AuthReducer, initialState} from './reducer';


export let AuthContext = createContext<{state: Auth; dispatch: Dispatch} | undefined>(undefined)

export const AuthContextProvider = ({children}: ProviderProps) => {

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthStore = () => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
      throw new Error('useAuthStore must be used within a AuthContextProvider')
    }
    return context
}

