import {useAppState} from "./useAppState"
import {useDrop} from "react-dnd"
import {moveItem, moveCard, setDraggedItem} from "../state/appStateActions"
import { DragItem } from "../state/types/DragItem"

export const useDropItem = (item: DragItem) => {
    const {state: {draggedItem}, dispatch} = useAppState()

    const [, drop] = useDrop({
        accept: ["COLUMN", "CARD"],
        hover(){
            if(!draggedItem){
                return;
            }
            if(draggedItem.type === "COLUMN"){
                if(draggedItem.id === item.id){
                    return;
                }
                dispatch(moveItem(draggedItem.id, item.id))
            } else if(draggedItem.type === "CARD"){
                if(draggedItem.id === item.id){
                    return;
                }

                if("columnId" in draggedItem && "columnId" in item) {
                    if(draggedItem.columnId === item.columnId) return
                    dispatch(moveCard(draggedItem.id, draggedItem.columnId, item.columnId))
                    dispatch(setDraggedItem({...draggedItem, columnId: item.columnId})) 
                }
            }
        }
    })

    return {drop}
}