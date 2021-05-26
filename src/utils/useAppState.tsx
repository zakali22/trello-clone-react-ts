import {useContext} from "react"
import {AppStateContext} from "../state/context/AppStateContext"

export const useAppState = () => useContext(AppStateContext)