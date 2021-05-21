import React from "react"
import {ColumnContainer, ColumnTitle} from "../styles/styles"
import AddItem from "./AddItem"

type ColumnProps = {
    title: string
}

const Column: React.FC<ColumnProps> = ({title, children}) => {
    return (
        <ColumnContainer>
            <ColumnTitle>{title}</ColumnTitle>
            {children}
            <AddItem buttonText="+ Add new item" onAdd={(task) => console.log(task)}/>
        </ColumnContainer>
    )
}

export default Column