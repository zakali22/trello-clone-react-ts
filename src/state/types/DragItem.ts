type ColumnDragItem = {
    id: string,
    type: string,
    text?: string
}

type CardDragItem = {
    id: string,
    type: string,
    text?: string
}

export type DragItem = ColumnDragItem | CardDragItem