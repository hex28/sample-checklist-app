import React, {createContext, useContext, useReducer} from 'react';
import {render} from '@testing-library/react'
import { CheckListContextProvider, useCheckList } from '.';

interface PropTypes {
    action: string,
    values: any,
    count: number
}

const SetUp = ({action, values, count}: PropTypes) => {

    return (
        <CheckListContextProvider>
            <TestComponent action={action} values={values} count={count} />
        </CheckListContextProvider>
    )
}

const TestComponent = ({action, values, count}: PropTypes) => {

    const {state, dispatch} = useCheckList()

    React.useEffect(()=>{
        if (action) {
            if (count == 1) {
                dispatch({
                    type: action,
                    payload: values
                })
            } else {
                for (let i = 0; i < count; i++) {
                    dispatch({
                        type: action,
                        payload: values[i]
                    })
                }
            }
        }
    }, [])

    return (
        <div>
            {state.map(item => 
                <span key={item.title}>
                    {JSON.stringify({title: item.title, completed: item.completed})}
                </span>
            )}
        </div>
    )
}

describe('Checklist Context', () => {
    test("push new item to empty state", () => {
        const {getByText} = render(
            <SetUp action={"addItem"} values={{title: "test", completed: true}} count={1}  />
        )
        expect(getByText(`{"title":"test","completed":true}`)).toBeInTheDocument(); 
    });
    
    test("push 2 items", () => {
        const {getByText} = render(
            <SetUp action={"addItem"} values={[{title: "a", completed: true}, {title: "b", completed: false}]} count={2}  />
        )
        expect(getByText(/{"title":"a","completed":true}/i)).toBeInTheDocument();
        expect(getByText(/{"title":"b","completed":false}/i)).toBeInTheDocument();
    });

})



