import {createContext, Dispatch, FC, useReducer, useEffect} from "react"
import {Action, addList} from "../appStateActions"
import {AppState, appData, appReducer, Task} from "../appStateReducers"
import {useQuery} from "@apollo/client"
import {GET_ALL_LISTS} from "../../graphql/queries/getAllLists"


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
    const {data, loading} = useQuery(GET_ALL_LISTS)

    useEffect(() => {
        if(data){
            data.getAllLists.map((list: any) => {
                dispatch(addList(list.text))
            })
        }
    }, [loading])
    
    if(loading) return <p>Loading</p>


    const getListById = (id: string) => state.lists.find(list => list.id === id)?.tasks || []

    return (

            <AppStateContext.Provider value={{state, dispatch, getListById}}>
                {children}
            </AppStateContext.Provider>

    )
}