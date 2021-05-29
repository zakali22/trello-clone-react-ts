import {Action} from "./appStateActions"
import {ADD_LIST, ADD_TASK, MOVE_ITEM, SET_DRAGGED_ITEM} from "./actionTypes"
import {uuid} from "uuidv4"
import {findListById, moveItem} from "../utils/arrayUtils"
import {DragItem} from "./types/DragItem"

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
    lists: List[],
    draggedItem: DragItem | null
}

export const appData: AppState = {
    lists: [],
    draggedItem: null
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
            const listWithNewTask = state.lists.map(list => {
                if(list.id === action.payload.listId) {
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
                lists: listWithNewTask
            }
            break;
        case SET_DRAGGED_ITEM: 
            return {
                ...state, 
                draggedItem: action.payload.draggedItem
            }
            break;
        case MOVE_ITEM: 
            const draggedItemId = state.lists.findIndex(list => list.id === action.payload.draggedItemId)
            const hoverItemId = state.lists.findIndex(list => list.id === action.payload.hoverItemId)   

            return {
                ...state,
                lists: moveItem(state.lists, draggedItemId, hoverItemId)
            }
        default: 
            return state
    }
}