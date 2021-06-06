import React, {useRef, useEffect} from "react"
import {ColumnContainer, ColumnTitle} from "../styles/styles"
import AddItem from "./AddItem"
import Card from "./Card"
import {useAppState} from "../utils/useAppState"
import {addTaskList, moveItem, setDraggedItem, moveCard} from "../state/appStateActions"
import {Task} from "../state/appStateReducers"
import {useDragItem} from "../utils/useDragItem"
import {useDropItem} from "../utils/useDropItem"
import {isHidden} from "../utils/isHidden"
import {useDrop} from "react-dnd"
import {GET_LIST} from "../graphql/queries/getList"
import {ADD_TASK} from "../graphql/mutations/addTask"
import { useMutation, useQuery } from "@apollo/client"

type ColumnProps = {
    id: string,
    title: string | undefined,
    isPreview?: boolean 
}

const Column: React.FC<ColumnProps> = ({title, id, children, isPreview}) => {
    const {state: {draggedItem}, dispatch} = useAppState()
    const {drag} = useDragItem({type: "COLUMN", id, text: title})
    const ref = useRef<HTMLDivElement>(null)
    const {data, loading, error} = useQuery(GET_LIST, {variables: {listId: id}})
    const [addTask] = useMutation(ADD_TASK)

    const [, drop] = useDrop({
        accept: ["COLUMN", "CARD"],
        hover(){
            if(!draggedItem){
                return;
            }
            if(draggedItem.type === "COLUMN"){
                if(draggedItem.id === id){
                    return;
                }
                dispatch(moveItem(draggedItem.id, id))
            } else if(draggedItem.type === "CARD"){
                if(draggedItem.id === id){
                    return;
                }

                if(data.getList.tasks.length){
                    return
                }

                if(draggedItem.columnId === id) return
                dispatch(moveCard(draggedItem.id, draggedItem.columnId, id))
                dispatch(setDraggedItem({...draggedItem, columnId: id})) 

            }
        }
    })

    drag(drop(ref))

    useEffect(() => {
        if(data){
            console.log(data)
            dispatch(addTaskList(id, data.getList))
        }

      }, [loading])

    if(loading) return <p>Loading</p>
    return (
        <ColumnContainer ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)} isPreview={isPreview}>
            <ColumnTitle>{title}</ColumnTitle>
            {data.getList.tasks.length > 0 ? (
                data.getList.tasks.map((task: Task) => (
                    <Card key={task.id} id={task.id} title={task.text} columnId={id}/>
                ))
            ) : null}
            <AddItem buttonText="+ Add new item" onAdd={(task) => {
                addTask({
                    variables: {listId: id, text: task}, 
                    refetchQueries: [{query: GET_LIST, variables: {listId: id}}],
                    optimisticResponse: {
                        addTask: {
                            text: task,
                            __typename: "Task",
                            _id: "temp-id"
                        }
                    }
                })
            }}/>
        </ColumnContainer>
    )
}

export default Column