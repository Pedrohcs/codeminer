const Transaction = require('../models/transaction')

module.exports.create = async function(transaction) {
    try {
        return await Transaction.create(transaction)
    } catch (error) {
        throw error
    }
}

module.exports.getAll = async function() {
    try {
        return await Transaction.find({ }).sort({ 'created': 1 })
    } catch (error) {
        throw error
    }
}