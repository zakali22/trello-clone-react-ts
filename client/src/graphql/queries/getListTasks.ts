import {gql} from "@apollo/client"

export const GET_LIST_TASKS = gql`
    query getListTasks($listId: ID!) {
        getListTasks(list: {_id: $listId}) {
            _id
            text
        }
    }
`