import {useContext} from "react"
import {AppStateContext} from "../context/AppStateContext"

export const useAppState = () => useContext(AppStateContext)