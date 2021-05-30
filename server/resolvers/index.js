exports.resolvers = {
    Query: {
        getAllLists: async (obj, args, {List}) => {
            return await List.find([])
        },
        getList: async (obj, args, context) => {
            
        },
        getListTasks: async (obj, args, context) => {

        },
        getListTask: async (obj, args, context) => {

        }
    },

    Mutations: {
        addList: async (obj, args, context) => {

        },
        addTask: async (obj, args, context) => {

        }
    }
}