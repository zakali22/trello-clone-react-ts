import {useEffect} from "react"
import {useAppState} from "./useAppState"
import {useDrag} from "react-dnd"
import {getEmptyImage} from "react-dnd-html5-backend"
import { DragItem } from "../state/types/DragItem"
import {setDraggedItem} from "../state/appStateActions"

export const useDragItem = (item: DragItem) => {
    const {dispatch} = useAppState()
    const [, drag, preview] = useDrag({
        type: item.type,
        item: () => {
            dispatch(setDraggedItem(item))
            return item
        },
        end: () => dispatch(setDraggedItem(null))
    })

    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true})
    }, [preview])

    return {drag}
}