import {ADD_LISTS, ADD_TASK} from "./actionTypes"
import {DragItem} from "./types/DragItem"

export type Action = 
    {type: 'ADD_LISTS', payload: {lists: []}} | 
    {type: 'ADD_TASK', payload: {listId: string, text: string}} | 
    {type: 'MOVE_ITEM', payload: {draggedItemId: string, hoverItemId: string }} |
    {type: 'MOVE_CARD', payload: {draggedCardId: string, sourceListId: string, targetListId: string}} |
    {type: 'SET_DRAGGED_ITEM', payload: {draggedItem: DragItem | null}} 

export const addLists = (lists: []): Action => ({type: 'ADD_LISTS', payload: {lists}})

export const addTask = (listId: string, text: string): Action => ({type: 'ADD_TASK', payload: {listId, text}})

export const moveItem = (draggedItemId: string, hoverItemId: string): Action => ({type: 'MOVE_ITEM', payload: {draggedItemId, hoverItemId}})

export const setDraggedItem = (draggedItem: DragItem | null): Action => ({type: 'SET_DRAGGED_ITEM', payload: {draggedItem}})

export const moveCard = (draggedCardId: string, sourceListId: string, targetListId: string): Action => ({type: 'MOVE_CARD', payload: {draggedCardId, sourceListId, targetListId}})