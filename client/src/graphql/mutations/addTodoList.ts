import {gql} from "@apollo/client"

export const ADD_TODO_LIST = gql`
    mutation addTodoList($listTitle: String!){
        addList(list: {text: $listTitle}){
            _id
            text
            tasks {
                _id
                text
            }
        }
    }
`