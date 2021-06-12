import styled from "styled-components"

export const AppContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
    min-height: 100vh;
    width: 100vw;
    background-color: #3179ba;
    padding: 20px;
`;

type DragItemContainerProps = {
    isHidden?: boolean,
    isPreview?: boolean
}

export const DragItemContainer = styled.div<DragItemContainerProps>`
    opacity: ${props => props.isHidden ? '0.5' : '1'};
    transform: ${props => props.isPreview ? 'rotate(5deg)' : 'none'}
`;

type DragPreviewLayerProps = {
    position: {
        x: number, 
        y: number
    }
}
// Pass as inline style (since styled components creates a class each time which will be heavy)
export const DragPreviewLayer = styled.div.attrs<DragPreviewLayerProps>(({position: {x, y}}) => ({
    style: {
        transform: `translate(${x}px, ${y}px)`
    }
}))<DragPreviewLayerProps>``

export const ColumnContainer = styled(DragItemContainer)`
    flex: 0 0 auto;
    background-color: #ebecf0;
    width: 300px;
    min-height: 40px;
    margin-right: 20px;
    border-radius: 3px;
    padding: 8px;
    cursor: pointer;
    margin-bottom: 20px
`

export const ColumnTitle = styled.div`
    padding: 6px 16px 12px;
    font-weight: bold;
`

export const CardContainer = styled(DragItemContainer)`
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;
    max-width: 300px;
    border-radius: 3px;
    box-shadow: #091e4240 0px 1px 0px 0px;
    cursor: pointer;
    background: white;
`

type AddItemButtonProps = {
    dark?: boolean
}

export const AddItemButton = styled.button<AddItemButtonProps>`
    background: #ffffff3d;
    border-radius: 5px;
    color: ${props => props.dark ? 'white' : 'black'};
    width: 100%;
    max-width: 300px;
    padding: 10px 12px;
    text-align: left;
    cursor: pointer;
    border: 1px solid #ffffff3d
`;

export const NewItemContainer = styled.form`
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start
`;

export const NewItemButton = styled.button`
    background: #5aac44;
    padding: 6px 12px;
    color: white;
    text-align: center;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    box-shadow: none;
`;

export const NewItemInput = styled.input`
    border-radius: 3px;
    border: none;
    box-shadow: #091e4240 0px 1px 0px 0px;
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;
    width: 100%;
`;

export const CustomDragLayerContainer = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    pointer-events: none;
    top: 0;
    left: 0;
    z-index: 100;
`