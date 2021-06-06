const mongoose = require("mongoose")
const List = require("../schema/ListSchema")
const Task = require("../schema/TaskSchema")

exports.resolvers = {
    Query: {
        getAllLists: async (obj, args, context) => {
            return await List.find({}).exec()
        },
        getList: async (obj, args, context) => {
            
        },
        getListTasks: async (obj, {list: {_id}}, context) => {
            const list = await List.findOne({_id}).select('tasks').exec()
            console.log(list)
            return list.tasks
        },
        getListTask: async (obj, args, context) => {

        }
    },

    Mutation: {
        addList: async (obj, {list: {text}}, context) => {
            try {
                const list = await new List({
                    text,
                    tasks: []
                }).save();
    
                return list
            } catch(e){
                console.log(e)
            }
        },
        addTask: async (obj, {list: {_id}, task: {text}}, context) => {
            try {
                const list = await List.findById(_id)

                if(list){
                    const task = await Task.create({
                        text
                    })

                    await List.findByIdAndUpdate(_id, {$push: {tasks: task._id}}, {new: true})
                    return task
                } 

                throw new Error("Cannot find that List")
            } catch(e){
                console.log(e)
            }
        }
    },
    List: {
        tasks: async (obj, args, context) => {
            try {
                return obj.tasks.map(async (taskId) => {
                    return await Task.findById(taskId)
                })
            } catch(e){
                console.log(e)
            }
        }
    }
}