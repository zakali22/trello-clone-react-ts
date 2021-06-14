import React, {useRef, useEffect} from "react"
import {useAppState} from "../utils/useAppState"
import {CardContainer} from "../styles/styles"
import {moveCard, addLists} from "../state/appStateActions"
import {useDragItem} from "../utils/useDragItem"
import {isHidden} from "../utils/isHidden"
import {useDrop} from "react-dnd"
import {useMutation} from "@apollo/client"
import {UPDATE_LIST} from "../graphql/mutations/updateList"

type CardProps = {
    id: string,
    title?: string,
    isPreview?: boolean,
    columnId: string
}

const Card = ({title, id, isPreview, columnId}: CardProps) => {
    const {state: {draggedItem, lists}, dispatch} = useAppState()
    const {drag} = useDragItem({type: "CARD", id, text: title, columnId})
    const ref = useRef<HTMLDivElement>(null)
    const [updateList] = useMutation(UPDATE_LIST)

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

                // console.log(draggedItem.id, draggedItem.columnId, id)
                dispatch(moveCard(draggedItem.id, draggedItem.columnId, columnId))
            }
        }
    })

    drag(drop(ref))

    useEffect(() => {
        // console.log(lists)
    }, [lists])

    return (
        <CardContainer ref={ref} isHidden={isHidden(draggedItem, "CARD", id, isPreview)} isPreview={isPreview}>{title}</CardContainer>
    )
}

export default Card