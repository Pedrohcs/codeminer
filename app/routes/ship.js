const express = require('express')
const shipController = require('../controllers/ship')

const router = express.Router()

router.post('/', create)

module.exports = router

async function create(req, res) {
    try {
        await shipController.createShip(req.body)
        res.status(201).send({ "message": "Registered ship!!" })
    } catch (error) {
        res.status(error.code || 500).send(error.message)
    }
}