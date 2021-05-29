import {useDragLayer} from "react-dnd"
import {useAppState} from "../utils/useAppState"
import {CustomDragLayerContainer, DragPreviewLayer} from "../styles/styles"
import Column from "./Column"

export const CustomDragLayer = () => {
    const { state: {draggedItem} } = useAppState();
    const { currentOffset } = useDragLayer((monitor) => ({
        currentOffset: monitor.getSourceClientOffset()
    }))

    return draggedItem && currentOffset ? (
        <CustomDragLayerContainer>
            <DragPreviewLayer position={currentOffset}>
                <Column id={draggedItem.id} title={draggedItem.text} isPreview/> 
            </DragPreviewLayer>
        </CustomDragLayerContainer>    
    ) : null
}