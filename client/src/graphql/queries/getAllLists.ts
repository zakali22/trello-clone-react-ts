import {gql} from "@apollo/client"
import {COMMON_LIST_FIELDS} from "../fragments/fragments"

export const GET_ALL_LISTS = gql`
    query getAllLists {
        getAllLists {
            _id
            text
            tasks {
                _id
                text
            }
        }
    }
`