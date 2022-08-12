const express = require('express')
const shipController = require('../controllers/ship')

const router = express.Router()

router.post('/', create)

router.post('/refill/fuel', refillFuel)

module.exports = router

async function create(req, res) {
    try {
        await shipController.createShip(req.body)
        res.status(201).send({ "message": "Registered ship!" })
    } catch (error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function refillFuel(req, res) {
    try {
        await shipController.refillFuel(req.body.pilot, req.body.ship, req.body.units)
        res.status(200).send({ "message": "Registered fuel refill!" })
    } catch (error) {
        res.status(error.code || 500).send(error.message)
    }
}