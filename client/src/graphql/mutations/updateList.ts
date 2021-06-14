import {gql} from "@apollo/client"

export const UPDATE_LIST = gql`
    mutation updateList($lists: [ListInput]){
        updateList(lists: $lists){
            _id
            text
            tasks {
                _id
                text
            }
        }
    }
`