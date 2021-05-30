import {DragItem} from "../state/types/DragItem"

export const isHidden = (draggedItem: DragItem | null, itemType: string, id: string, isPreview: boolean | undefined) => {
    return Boolean(!isPreview && draggedItem && draggedItem.type === itemType && draggedItem.id === id)
}