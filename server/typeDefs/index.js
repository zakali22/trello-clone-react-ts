exports.typeDefs = `

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
        tasks: [Task]
    }

    input TaskInput {
        _id: ID
        text: String
    }

    type Query {
        getAllLists: [List]
        getList(listId: ListInput): List
        getListTasks(listId: ListInput): [Task]
        getListTask(listId: ListInput, taskId: TaskInput): Task
    }

    type Mutations {
        addList(list: ListInput): [List]
        addTask(listId: ListInput, task: TaskInput): [Task]
    }


`