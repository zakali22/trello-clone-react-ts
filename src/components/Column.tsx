import React from "react"
import {ColumnContainer, ColumnTitle} from "../styles/styles"
import AddItem from "./AddItem"
import Card from "./Card"
import {useAppState} from "../utils/useAppState"
import {addTask} from "../state/appStateActions"

type ColumnProps = {
    id: string,
    title: string
}

const Column: React.FC<ColumnProps> = ({title, id, children}) => {
    const {getListById, dispatch} = useAppState()
    const tasks = getListById(id)

    console.log(tasks)
    
    return (
        <ColumnContainer>
            <ColumnTitle>{title}</ColumnTitle>
            {tasks.map(task => (
                <Card key={task.id} id={task.id} title={task.text} />
            ))}
            <AddItem buttonText="+ Add new item" onAdd={(task) => dispatch(addTask(id, task))}/>
        </ColumnContainer>
    )
}

export default Column