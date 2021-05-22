import React from "react"
import {CardContainer} from "../styles/styles"

type CardProps = {
    id: string,
    title?: string
}

const Card = ({title}: CardProps) => {
    return (
        <CardContainer>{title}</CardContainer>
    )
}

export default Card