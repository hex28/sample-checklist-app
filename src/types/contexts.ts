import { ReactNode } from "react"

export type ProviderProps = {
    children: ReactNode
}

export interface Action {
    type: string, 
    payload? : any
}

export type Dispatch = (action: Action) => void

export type State = {

}

export interface Auth {
    login: boolean,
    id: number,
    email: string,
    firstName?: string,
    lastName?: string,
}

export interface CheckItems {
    title: string,
    completed: boolean
}
