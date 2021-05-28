import {ADD_LIST, ADD_TASK} from "./actionTypes"

export type Action = {type: 'ADD_LIST', payload: {text: string}} | {type: 'ADD_TASK', payload: {listId: string, text: string}}

export const addList = (text: string): Action => ({type: 'ADD_LIST', payload: {text}})
export const addTask = (listId: string, text: string): Action => ({type: 'ADD_TASK', payload: {listId, text}})