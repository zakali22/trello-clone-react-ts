import styled from "styled-components"

export const AppContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    min-height: 100vh;
    width: 100vw;
    background-color: #3179ba;
`

export const ColumnContainer = styled.div`
    flex: 0 0 auto;
    background-color: #ebecf0;
    width: 300px;
    min-height: 40px;
    margin-right: 20px;
    border-radius: 3px;
    padding: 8px;
`

export const ColumnTitle = styled.div`
    padding: 6px 16px 12px;
    font-weight: bold;
`

export const CardContainer = styled.div`
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;
    max-width: 300px;
    border-radius: 3px;
    box-shadow: #091e4240 0px 1px 0px 0px;
    cursor: pointer;
`