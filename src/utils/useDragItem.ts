import {useAppState} from "./useAppState"
import {useDrag} from "react-dnd"
import { DragItem } from "../state/types/DragItem"
import {setDraggedItem} from "../state/appStateActions"

export const useDragItem = (item: DragItem) => {
    const {dispatch} = useAppState()
    const [, drag] = useDrag({
        type: item.type,
        item: () => {
            dispatch(setDraggedItem(item))
            return item
        },
        end: () => dispatch(setDraggedItem(null))
    })

    return {drag}
}