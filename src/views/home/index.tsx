import React, {useState, ChangeEvent } from 'react';
import {useAuthStore} from '../../contexts/auth';
import { useCheckList } from '../../contexts/checklist';
import './styles.scss';

interface CheckedItems {
    title: string,
    completed: boolean 
}

const Home = (props: any) => {
    const [newItem, setNewItem] = useState<CheckedItems | undefined>({
        title: "",
        completed: false
    })
    const authStore = useAuthStore()
    const checkListStore = useCheckList()
    const {firstName, lastName, email, picture} = authStore.state
    let userName = email;
    if (firstName && firstName !== null && typeof firstName == 'string') {
        userName = firstName
        userName += lastName && lastName !== null && typeof lastName == 'string' ? ' ' + lastName : ''
    } 

    const createNewItem = () => {
        if (newItem) {
            alert('You already started a new item!')
            return;
        }
        setNewItem({
            title: "",
            completed: false
        })
    }

    const deleteNewItem = () => {
        setNewItem(undefined)
    }

    const checkNewItem = () => {
        setNewItem({
            title: newItem ? newItem.title : "",
            'completed': newItem ? !newItem.completed : false
        })
    }

    const handleNewItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItem ({
            title: e.target.value,
            completed: newItem ? newItem.completed : false
        })
    }

    const addItem = () => {
        if (newItem) {
            checkListStore.dispatch({
                type: 'addItem',
                payload: {
                    title: newItem.title,
                    completed: newItem.completed
                }
            })
            setNewItem(undefined)
        }
    }

    const removeItem = (index: number) => () => {
        checkListStore.dispatch({
            type: 'removeItem',
            payload: index
        })
    }

    const checkItem = (index:number) => () => {
        checkListStore.dispatch({
            type: 'checkItem',
            payload: index
        })
    }

    return (
        <>
            <div className="header">
                <div id="header-name" className="header-name">
                    <div className="user">
                        {userName}
                    </div>
                </div>
                <div className="header-image">
                    {
                        picture ? 
                            <a href="https://randomuser.me" target="_blank" rel="noopener noreferrer">
                                <img src={picture.medium} alt={picture.medium} />
                            </a>
                            :
                            <></>
                    }
                </div>
            </div>
            <div className="checklist">
                <ul>
                {
                    checkListStore.state.map((item, index) => 
                        <li key={index}>
                            <div>
                                <label className="checkmark-container" htmlFor={`checkbox-${index}`}>{item.title}
                                <input id={`checkbox-${index}`} type="checkbox" onClick={checkItem(index)} defaultChecked={item.completed} />
                                <span className="checkmark-checkbox"></span>
                                </label>
                            </div>
                            <button className="btn btn-action" onClick={removeItem(index)}>
                                x
                            </button>
                        </li>
                    )
                }
                {
                    newItem &&
                    <li>
                        <div>
                            <label className="checkmark-container new-item" htmlFor="new-item">
                            <input id="new-item" type="checkbox" onClick={checkNewItem} defaultChecked={newItem.completed} />
                            <input id="new-item-title" type="text" placeholder={'Enter Item Title Here'} onChange={handleNewItemTitle} value={newItem.title} />
                            <span className="checkmark-checkbox"></span>
                            </label>
                        </div>
                        <button id="plus-button" className="btn btn-action" onClick={addItem}>
                            +
                        </button>
                        <button id="remove-button" className="btn btn-action" onClick={deleteNewItem}>
                            x
                        </button>
                    </li>
                }
                </ul>
                <div className="add">
                    <button className="btn btn-add" onClick={createNewItem}>
                        Add
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home;