const express = require('express')
const pilotController = require('../controllers/pilot')

const router = express.Router()

router.post('/', create)

module.exports = router

async function create(req, res) {
    try {
        await pilotController.createPilot(req.body)
        res.status(201).send({ "message": "Registered pilot!" })
    } catch (error) {
        res.status(error.code || 500).send(error.message)
    }
}