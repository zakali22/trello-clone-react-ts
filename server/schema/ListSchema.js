const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    tasks: {
        type: [Schema.Types.ObjectId],
        ref: 'Task'
    }
}, {timestamps: true})

module.exports = mongoose.model('List', ListSchema)