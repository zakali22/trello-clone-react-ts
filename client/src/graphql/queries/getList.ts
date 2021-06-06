import {gql} from "@apollo/client"

export const GET_LIST = gql`
    query getList($listId: ID) {
        getList(list: {_id: $listId}) {
            _id
            text
            tasks {
                _id
                text
            }
        }
    }
`