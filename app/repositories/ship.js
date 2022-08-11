const Ship = require('../models/ship')

module.exports.create = async function(ship) {
    try {
        return await Ship.create(ship)
    } catch (error) {
        if (error.code === 11000) {
            let keyError = Object.keys(error.keyPattern)
            throw new Error(`There is already a ship registered with this ${keyError[0]}`)
        }
        else
            throw error
    }
}

module.exports.getById = async function(id) {
    try {
        return await Ship.findOne({ '_id': id })
    } catch (error) {
        throw error
    }
}

module.exports.getByIdentifierCode = async function(identifierCode) {
    try {
        return await Ship.findOne({ 'identifierCode': identifierCode })
    } catch (error) {
        throw error
    }
}

module.exports.updateById = async function(id, set) {
    try {
        return await Ship.updateOne({ '_id': id }, { '$set': set })
    } catch(error) {
        throw error
    }
}