import {createContext, FC} from "react"
import {uuid} from "uuidv4"

// Define AppState type and its property types
type Task = {
    id: string, 
    text: string
}

type List = {
    id: string, 
    text: string, 
    tasks: Task[]
}

export type AppState = {
    lists: List[]
}

// Define appData (initial state)
const appData: AppState = {
    lists: [] // We can keep it as an empty array (later on)
}

// Define context
type AppStateContextProps = { // Typing of the defaultProps expected by createContext
    lists: List[],
    getTasksByListId(id: string): Task[]
}

// Since we don't have an initialState to provide we pass an empty object (as AppStateContextProps)
export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps) 


// Export context provider
export const AppStateProvider: FC = ({children}) => {
    const {lists} = appData

    const getTasksByListId = (id: string) => lists.find(list => (list.id === id))?.tasks || []

    return (
        <AppStateContext.Provider value={{lists, getTasksByListId}}>
            {children}
        </AppStateContext.Provider>
    )
}