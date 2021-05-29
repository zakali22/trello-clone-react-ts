import React, {useRef} from "react"
import {ColumnContainer, ColumnTitle} from "../styles/styles"
import AddItem from "./AddItem"
import Card from "./Card"
import {useAppState} from "../utils/useAppState"
import {addTask, moveItem} from "../state/appStateActions"
import {useDragItem} from "../utils/useDragItem"
import {useDropItem} from "../utils/useDropItem"
import {isHidden} from "../utils/isHidden"

type ColumnProps = {
    id: string,
    title: string
}

const Column: React.FC<ColumnProps> = ({title, id, children}) => {
    const {state: {draggedItem}, getListById, dispatch} = useAppState()
    const {drag} = useDragItem({type: "COLUMN", id})
    const {drop} = useDropItem({type: "COLUMN", id})
    const ref = useRef<HTMLDivElement>(null)
    const tasks = getListById(id)

    drag(drop(ref))
    
    return (
        <ColumnContainer ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id)}>
            <ColumnTitle>{title}</ColumnTitle>
            {tasks.map(task => (
                <Card key={task.id} id={task.id} title={task.text} />
            ))}
            <AddItem buttonText="+ Add new item" onAdd={(task) => dispatch(addTask(id, task))}/>
        </ColumnContainer>
    )
}

export default Column