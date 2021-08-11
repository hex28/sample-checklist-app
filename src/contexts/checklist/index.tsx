import React, {createContext, useContext, useReducer} from 'react';
import {Auth, CheckItems, Dispatch, ProviderProps} from '../../types/contexts';
import {CheckListReducer, initialState} from './reducer';


export let CheckListContext = createContext<{state: CheckItems[]; dispatch: Dispatch} | undefined>(undefined)

export const CheckListContextProvider = ({children}: ProviderProps) => {

    const [state, dispatch] = useReducer(CheckListReducer, initialState)

    return (
        <CheckListContext.Provider value={{state, dispatch}}>
            {children}
        </CheckListContext.Provider>
    )
}

export const useCheckList = () => {
    const context = React.useContext(CheckListContext)
    if (context === undefined) {
      throw new Error('useCheckList must be used within a CheckListContextProvider')
    }
    return context
}
