// Find list by id
type Item = {
    id: string
}

export const findListById = (lists: Item[], id: string) => lists.findIndex(list => list.id === id) 
// export const findListById = <TItem extends>(lists: TItem[], id: string) => lists.findIndex(list => list.id === id) //Different way of typing arguments