import {createContext, Dispatch, FC, useReducer, useEffect} from "react"
import {Action} from "../appStateActions"
import {AppState, appData, appReducer, Task} from "../appStateReducers"
import {useQuery} from "@apollo/client"
import {GET_ALL_LISTS} from "../../graphql/queries/getAllLists"


// Create context
type AppStateContextProps = {
    state: AppState,
    dispatch: Dispatch<Action>
}

export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

// Create context provider wrapper component
export const AppStateProvider: FC = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, appData);
    
    return (

            <AppStateContext.Provider value={{state, dispatch}}>
                {children}
            </AppStateContext.Provider>

    )
}