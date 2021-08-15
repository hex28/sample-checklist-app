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

export type Picture = {
    large: string,
    medium: string,
    thumbnail: string
}

export interface Auth {
    login: boolean,
    id: string,
    email: string,
    firstName?: string,
    lastName?: string,
    picture?: Picture
}

export interface CheckItems {
    title: string,
    completed: boolean
}
