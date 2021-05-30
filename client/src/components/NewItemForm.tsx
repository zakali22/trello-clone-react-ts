import {useState, SyntheticEvent, useRef, useEffect} from "react"
import {useFocus} from "../utils/useFocus"
import {NewItemContainer, NewItemButton, NewItemInput} from "../styles/styles"

type NewItemFormProps = {
    onAdd: (task: string) => void
}

const NewItemForm = ({onAdd}: NewItemFormProps) => {
    const [newTask, setNewTask] = useState('')
    const inputRef = useFocus();

    const addTask = (e: SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        onAdd(newTask)
    }

    return (
        <NewItemContainer onSubmit={addTask}>
            <NewItemInput ref={inputRef} type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Add new task" />
            <NewItemButton onClick={addTask}>Create</NewItemButton>
        </NewItemContainer>
    )
}

export default NewItemForm;