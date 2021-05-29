// Find list by id
type Item = {
    id: string
}

export const findListById = (lists: Item[], id: string) => lists.findIndex(list => list.id === id) 
// export const findListById = <TItem extends>(lists: TItem[], id: string) => lists.findIndex(list => list.id === id) //Different way of typing arguments


/** Insert/Remove item at an index */
const insertItemAtIndex = <TItem>(array: TItem[], item: TItem, index: number) => {
    return [...array.slice(0, index), item, ...array.slice(index)]
}

const removeItemAtIndex = <TItem>(array: TItem[], index: number) => {
    return [...array.slice(0, index), ...array.slice(index + 1)]
}

/** Move an item - args = array, from (dragItem), to (hoverItem) */
export const moveItem = <TItem>(array: TItem[], from: number, to: number) => {
    const item = array[from]

    return insertItemAtIndex(removeItemAtIndex(array, from), item, to)
}