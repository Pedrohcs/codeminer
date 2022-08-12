const express = require('express')
const reportController = require('../controllers/report')

const router = express.Router()

router.get('/total/weight', totalWeight)

router.get('/total/transactions', intergalacticFederationTransactions)

router.get('/pilot/percentage/resource', percentageResourceByPilot)

module.exports = router

async function totalWeight(req, res) {
    try {
        let report = await reportController.totalWeight()
        res.status(200).send(report)
    } catch (error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function intergalacticFederationTransactions(req, res) {
    try {
        let report = await reportController.intergalacticFederationTransactions()
        res.status(200).send(report)
    } catch (error) {
        res.status(error.code || 500).send(error.message)
    }
}

async function percentageResourceByPilot(req, res) {
    try {
        let report = await reportController.percentageResourceByPilot()
        res.status(200).send(report)
    } catch (error) {
        res.status(error.code || 500).send(error.message)
    }
}