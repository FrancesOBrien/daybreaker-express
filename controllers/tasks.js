const express = require('express')
const router = express.Router()
const Tasks = require('../models/tasks')

//Index
router.get('/', (req, res) => {
    Tasks.find({}, (err, foundTasks) => {
        res.json(foundTasks)
    })
})

//New Will be handled by React app

//Delete
router.delete('/:id', (req, res) => {
    Tasks.findByIdAndRemove(req.params.id, (err, deletedTasks) => {
        res.json(deletedTasks)
    })
})

//Update
router.put('/:id', (req, res) => {
    Tasks.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTask) => {
        res.json(updatedTask)
    })
})

//Create
router.post('/', (req, res) => {
    Tasks.create(req.body, (err, createdTask) => {
        res.json(createdTask)
    })
})

//Edit will be handled by React app

//Show
router.get('/:id', (req, res) => {
    Tasks.findById(req.params.id, (err, foundTask) => {
        res.json(foundTask)
    })
})

module.exports = router