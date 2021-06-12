import {Action} from "./appStateActions"
import {ADD_LISTS, ADD_TASK, MOVE_ITEM, SET_DRAGGED_ITEM, MOVE_CARD} from "./actionTypes"
import {uuid} from "uuidv4"
import {findListById, moveItem, mergeObjectsInUnique} from "../utils/arrayUtils"
import {DragItem} from "./types/DragItem"

// App State type
export type Task = {
    id: string,
    text: string
}

export type List = {
    _id: string, 
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
        case ADD_LISTS:
            return {
                ...state, 
                lists: action.payload.lists
            }
            break;
        case ADD_TASK:
            const listWithNewTask = state.lists.map(list => {
                if(list._id === action.payload.listId) {
                    return {
                        ...action.payload.newList
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
            const draggedItemId = state.lists.findIndex(list => list._id === action.payload.draggedItemId)
            const hoverItemId = state.lists.findIndex(list => list._id === action.payload.hoverItemId)   

            return {
                ...state,
                lists: moveItem(state.lists, draggedItemId, hoverItemId)
            }
            break;
        case MOVE_CARD:
            let sourceListId = state.lists.findIndex(list => list._id === action.payload.sourceListId)
            let targetListId = state.lists.findIndex(list => list._id === action.payload.targetListId)
            const draggedCardId = state.lists[sourceListId].tasks.findIndex(task => task.id === action.payload.draggedCardId)
            const cardItem = state.lists[sourceListId].tasks[draggedCardId]

            console.log(sourceListId, targetListId)
            
            let listMerged = state.lists.map(list => {
                if(list._id === action.payload.targetListId && cardItem){
                    console.log("From target")
                    return {
                        ...list,
                        tasks: [...list.tasks, cardItem]
                    }
                } else if(list._id ===  action.payload.sourceListId){
                    console.log("From source")
                    return {
                        ...list,
                        tasks: list.tasks.filter(task => task.id !== action.payload.draggedCardId)
                    }
                } else {
                    return list
                }
            })
            

            return {
                ...state,
                lists: listMerged
            }
            break;
        default: 
            return state
    }
}