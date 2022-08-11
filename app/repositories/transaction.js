const Transaction = require('../models/transaction')

module.exports.create = async function(transaction) {
    try {
        return await Transaction.create(transaction)
    } catch (error) {
        throw error
    }
}