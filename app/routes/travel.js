const express = require('express')
const travelController = require('../controllers/travel')

const router = express.Router()

router.post('/', create)

module.exports = router

async function create(req, res) {
    try {
        await travelController.registerTravel(req.body)
        res.status(201).send({ "message": "Registered travel!" })
    } catch (error) {
        res.status(error.code || 500).send(error.message)
    }
}