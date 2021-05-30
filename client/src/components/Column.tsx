import React, {useRef} from "react"
import {ColumnContainer, ColumnTitle} from "../styles/styles"
import AddItem from "./AddItem"
import Card from "./Card"
import {useAppState} from "../utils/useAppState"
import {addTask, moveItem, setDraggedItem, moveCard} from "../state/appStateActions"
import {useDragItem} from "../utils/useDragItem"
import {useDropItem} from "../utils/useDropItem"
import {isHidden} from "../utils/isHidden"
import {useDrop} from "react-dnd"

type ColumnProps = {
    id: string,
    title: string | undefined,
    isPreview?: boolean 
}

const Column: React.FC<ColumnProps> = ({title, id, children, isPreview}) => {
    const {state: {draggedItem}, getListById, dispatch} = useAppState()
    const {drag} = useDragItem({type: "COLUMN", id, text: title})
    const ref = useRef<HTMLDivElement>(null)
    const tasks = getListById(id)

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

                if(tasks.length){
                    return
                }

                if(draggedItem.columnId === id) return
                dispatch(moveCard(draggedItem.id, draggedItem.columnId, id))
                dispatch(setDraggedItem({...draggedItem, columnId: id})) 

            }
        }
    })

    drag(drop(ref))
    
    return (
        <ColumnContainer ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)} isPreview={isPreview}>
            <ColumnTitle>{title}</ColumnTitle>
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <Card key={task.id} id={task.id} title={task.text} columnId={id}/>
                ))
            ) : null}
            <AddItem buttonText="+ Add new item" onAdd={(task) => dispatch(addTask(id, task))}/>
        </ColumnContainer>
    )
}

export default Column