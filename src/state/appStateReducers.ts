import {Action} from "./appStateActions"
import {ADD_LIST, ADD_TASK} from "./actionTypes"
import {uuid} from "uuidv4"

// App State type
export type Task = {
    id: string,
    text: string
}

export type List = {
    id: string, 
    text: string, 
    tasks: Task[]
}

export type AppState = {
    lists: List[]
}

export const appData: AppState = {
    lists: []
}

export function appReducer(state: AppState, action: Action){
    switch(action.type){
        case ADD_LIST:
            const newList = {id: uuid(), text: action.payload.text, tasks: []}
            return {
                ...state, 
                lists: [...state.lists, newList]
            }
            break;
        case ADD_TASK:
            const listNewTask = state.lists.map(list => {
                if(list.id === action.payload.listId){
                    return {
                        ...list,
                        tasks: [...list.tasks, {id: uuid(), text: action.payload.text}]
                    }
                } else {
                    return list
                }
            })

            return {
                ...state, 
                lists: [...listNewTask]
            }
        default: 
            return state
    }
}