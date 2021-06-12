import {gql} from "@apollo/client"

export const ADD_TASK = gql`
    mutation addTask($listId: ID!, $text: String!){
        addTask(list: {_id: $listId}, task: {text: $text}) {
            _id
            text
            tasks {
                _id
                text
            }
        }
    }
`