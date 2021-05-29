import {useAppState} from "./useAppState"
import {useDrop} from "react-dnd"
import {moveItem} from "../state/appStateActions"
import { DragItem } from "../state/types/DragItem"

export const useDropItem = (item: DragItem) => {
    const {state: {draggedItem}, dispatch} = useAppState()

    const [, drop] = useDrop({
        accept: item.type,
        hover(){
            if(!draggedItem){
                return;
            }
            if(draggedItem.type === item.type){
                if(draggedItem.id === item.id){
                    return;
                }
                dispatch(moveItem(draggedItem.id, item.id))
            }
        }
    })

    return {drop}
}