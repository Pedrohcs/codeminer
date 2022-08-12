const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const pilotRoute = require('./routes/pilot')
const shipRoute = require('./routes/ship')
const contractRoute = require('./routes/contract')
const travelRoute = require('./routes/travel')
const reportRoute = require('./routes/report')

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
app.use('/travels', travelRoute)
app.use('/reports', reportRoute)

module.exports = app