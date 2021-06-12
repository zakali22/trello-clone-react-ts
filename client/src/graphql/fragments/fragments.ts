import {gql} from "@apollo/client"

export const COMMON_LIST_FIELDS = gql`
    fragment CommonListFields on List {
        _id
        text
    }
`