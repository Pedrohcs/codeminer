const express = require('express')
const contractController = require('../controllers/contract')

const router = express.Router()

router.post('/', create)

module.exports = router

async function create(req, res) {
    try {
        await contractController.createContract(req.body)
        res.status(201).send({ "message": "Registered contract!" })
    } catch (error) {
        res.status(error.code || 500).send(error.message)
    }
}