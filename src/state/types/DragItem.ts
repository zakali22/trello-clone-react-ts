type ColumnDragItem = {
    id: string,
    type: "COLUMN",
    text?: string
}

type CardDragItem = {
    id: string,
    type: "CARD",
    text?: string,
    columnId: string
}

export type DragItem = ColumnDragItem | CardDragItem