import {CheckItems, Action} from '../../types/contexts';

const initialState: CheckItems[] = [
]


const CheckListReducer = (state: CheckItems[], action: Action) => {  
    switch (action.type) {
        case 'addItem':
            return [
                ...state,
                action.payload
            ]
            break;
        case 'removeItem':
            let splicedState = [...state]
            splicedState.splice(action.payload, 1)
            return splicedState
            break;
        case 'checkItem':
            let updatedState:CheckItems[] = []
            for (const item of state) {
                updatedState.push(Object.assign({}, item))
            }
            updatedState[action.payload].completed = !updatedState[action.payload].completed
            return updatedState
            break;
        case 'loadTestData':
            return [
                {title: 'a', completed: true}
            ]
            break;
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
            break;
    }
}

export {CheckListReducer, initialState};