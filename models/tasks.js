const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task: String,
    category: String,
    details: String,
    points: Number,
    isComplete: Boolean
})

const Tasks = mongoose.model('Task', taskSchema)

module.exports = Tasks
