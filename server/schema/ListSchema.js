const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const TaskSchema = require("./TaskSchema").schema

const ListSchema = new Schema({
    text: {
        type: String
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, {timestamps: true})

module.exports = mongoose.model('List', ListSchema)