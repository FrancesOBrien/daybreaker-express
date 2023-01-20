//dependencies
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const db = mongoose.connection
const Tasks = require('./models/tasks')
const tasksDaily = require('./utilities/daily')

//Environmental Variables
const app = express()
const mongoURI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001

//Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true }, 
    () => console.log('MongoDB connection established:', mongoURI)
    )

//Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

//Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

//Routes
const tasksController = require('./controllers/tasks')
app.use('/tasks', tasksController)

//seeding the db
app.get('/seed', async (req, res) => {
    await Tasks.deleteMany({});
    await Tasks.insertMany(tasksDaily);
    res.send('done!')
})

app.listen(PORT, () => {
    console.log('this message means nothing', PORT)
})

