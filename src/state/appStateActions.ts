import {ADD_LIST, ADD_TASK} from "./actionTypes"
import {DragItem} from "./types/DragItem"

export type Action = 
    {type: 'ADD_LIST', payload: {text: string}} | 
    {type: 'ADD_TASK', payload: {listId: string, text: string}} | 
    {type: 'MOVE_ITEM', payload: {draggedItemId: string, hoverItemId: string }} |
    {type: 'SET_DRAGGED_ITEM', payload: {draggedItem: DragItem | null}}

export const addList = (text: string): Action => ({type: 'ADD_LIST', payload: {text}})

export const addTask = (listId: string, text: string): Action => ({type: 'ADD_TASK', payload: {listId, text}})

export const moveItem = (draggedItemId: string, hoverItemId: string): Action => ({type: 'MOVE_ITEM', payload: {draggedItemId, hoverItemId}})

export const setDraggedItem = (draggedItem: DragItem | null): Action => ({type: 'SET_DRAGGED_ITEM', payload: {draggedItem}})