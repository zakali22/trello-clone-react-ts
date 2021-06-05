const List = require("../schema/ListSchema")
const Task = require("../schema/TaskSchema")

exports.resolvers = {
    Query: {
        getAllLists: async (obj, args, context) => {
            return await List.find({})
        },
        getList: async (obj, args, context) => {
            
        },
        getListTasks: async (obj, args, context) => {

        },
        getListTask: async (obj, args, context) => {

        }
    },

    Mutation: {
        addList: async (obj, {text}, context) => {
            try {
                await List.create({
                    text,
                    tasks: []
                })
    
                return await List.find({})
            } catch(e){
                console.log(e)
            }
        },
        addTask: async (obj, args, context) => {

        }
    }
}