import {useState} from "react"
import NewItemForm from "./NewItemForm"
import {AddItemButton} from "../styles/styles"

type AddItemProps = {
    dark?: boolean,
    onAdd: (task: string) => void,
    buttonText: string
}

const AddItem = ({dark, buttonText, onAdd}: AddItemProps) => {
    const [showForm, setShowForm] = useState(false)


    if(showForm){
        return (
            <NewItemForm onAdd={(task) => {
                onAdd(task)
                setShowForm(false)
            }}/>
        )
    }

    return (
        <AddItemButton dark={dark} onClick={() => setShowForm(true)}>{buttonText}</AddItemButton>
    )
}

export default AddItem