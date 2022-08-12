const express = require('express')
const contractController = require('../controllers/contract')

const router = express.Router()

router.post('/', create)

router.get('/open', openContracts)

router.post('/accept', acceptContract)

module.exports = router

async function create(req, res) {
    try {
        await contractController.createContract(req.body)
        res.status(201).send({ "message": "Registered contract!" })
    } catch (error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function openContracts(req, res) {
    try {
        let contracts = await contractController.listOpenContracts()
        res.status(200).send({ "contracts": contracts })
    } catch (error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function acceptContract(req, res) {
    try {
        await contractController.acceptContract(req.body.contract, req.body.pilot, req.body.ship)
        res.status(200).send({ "message": "Agreement accepted!" })
    } catch (error) {
        res.status(error.code || 500).send(error.message)
    }
}