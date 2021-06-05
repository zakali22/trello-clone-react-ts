const { gql } = require('apollo-server-express');

exports.typeDefs = gql`

    type Task {
        _id: ID
        text: String
    }

    type List {
        _id: ID
        text: String
        tasks: [Task]
    }

    input ListInput {
        _id: ID
        text: String
    }

    input TaskInput {
        _id: ID
        text: String
    }

    type Query {
        getAllLists: [List]
        getList(list: ListInput): List
        getListTasks(list: ListInput): [Task]
        getListTask(list: ListInput, taskId: TaskInput): Task
    }

    type Mutation {
        addList(list: ListInput): [List]
        addTask(listId: ListInput, task: TaskInput): [Task]
    }
`