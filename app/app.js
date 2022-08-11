const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const pilotRoute = require('./routes/pilot')
const shipRoute = require('./routes/ship')
const contractRoute = require('./routes/contract')

const app = express()
mongoose.connect('mongodb+srv://codeminer:test@codeminer.x2esikh.mongodb.net/?retryWrites=true&w=majority', {
    socketTimeoutMS: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/pilots', pilotRoute)
app.use('/ships', shipRoute)
app.use('/contracts', contractRoute)

module.exports = app