import React, {useRef} from "react"
import {useAppState} from "../utils/useAppState"
import {CardContainer} from "../styles/styles"
import {moveCard} from "../state/appStateActions"
import {useDragItem} from "../utils/useDragItem"
import {isHidden} from "../utils/isHidden"
import {useDrop} from "react-dnd"

type CardProps = {
    id: string,
    title?: string,
    isPreview?: boolean,
    columnId: string
}

const Card = ({title, id, isPreview, columnId}: CardProps) => {
    const {state: {draggedItem}, dispatch} = useAppState()
    const {drag} = useDragItem({type: "CARD", id, text: title, columnId})
    const ref = useRef<HTMLDivElement>(null)

    const [, drop] = useDrop({
        accept: "CARD",
        hover(){
            if(!draggedItem){
                return;
            }
            if(draggedItem.type !== "CARD"){
                return;
            } else if(draggedItem.type === "CARD"){
                if(draggedItem.id === id){
                    return;
                }

                dispatch(moveCard(draggedItem.id, draggedItem.columnId, id))
            }
        }
    })

    drag(drop(ref))

    return (
        <CardContainer ref={ref} isHidden={isHidden(draggedItem, "CARD", id, isPreview)} isPreview={isPreview}>{title}</CardContainer>
    )
}

export default Card