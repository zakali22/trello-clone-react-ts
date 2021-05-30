import {createContext, Dispatch, FC, useReducer} from "react"
import {Action} from "../appStateActions"
import {AppState, appData, appReducer, Task} from "../appStateReducers"

// Create context
type AppStateContextProps = {
    state: AppState,
    dispatch: Dispatch<Action>,
    getListById(id: string): Task[]
}

export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

// Create context provider wrapper component
export const AppStateProvider: FC = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, appData);

    const getListById = (id: string) => state.lists.find(list => list.id === id)?.tasks || []

    return (
        <AppStateContext.Provider value={{state, dispatch, getListById}}>
            {children}
        </AppStateContext.Provider>
    )
}