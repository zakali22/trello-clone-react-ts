import {useRef, useEffect} from "react"

export const useFocus = () => {
    const ref = useRef() as React.MutableRefObject<HTMLInputElement>

    useEffect(() => {
        ref.current?.focus()
    }, [])
}