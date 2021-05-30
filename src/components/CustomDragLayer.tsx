import {useDragLayer} from "react-dnd"
import {useAppState} from "../utils/useAppState"
import {CustomDragLayerContainer, DragPreviewLayer} from "../styles/styles"
import Column from "./Column"
import Card from "./Card"

export const CustomDragLayer = () => {
    const { state: {draggedItem} } = useAppState();
    const { currentOffset } = useDragLayer((monitor) => ({
        currentOffset: monitor.getSourceClientOffset()
    }))

    return draggedItem && currentOffset ? (
        <CustomDragLayerContainer>
            <DragPreviewLayer position={currentOffset}>
                {draggedItem.type === 'COLUMN' ? (
                    <Column id={draggedItem.id} title={draggedItem.text} isPreview/> 
                ) : (
                    <Card id={draggedItem.id} title={draggedItem.text} columnId={draggedItem.columnId} />
                )}
            </DragPreviewLayer>
        </CustomDragLayerContainer>    
    ) : null
}