const Contract = require('../models/contract')

module.exports.create = async function(resource) {
    try {
        return await Contract.create(resource)
    } catch (error) {
        throw error
    }
}

module.exports.getById = async function(id) {
    try {
        return await Contract.findOne({ '_id': id })
    } catch(error) {
        throw error
    }
}

module.exports.updateById = async function(id, set) {
    try {
        return await Contract.updateOne({ '_id': id }, { '$set': set })
    } catch(error) {
        throw error
    }
}

module.exports.getOpenContracts = async function() {
    try {
        return await Contract.find({ 'owner': { $exists: false } })
    } catch(error) {
        throw error
    }
}