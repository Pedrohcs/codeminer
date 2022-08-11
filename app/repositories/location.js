const Location = require('../models/location')

module.exports.create = async function(location) {
    try {
        return await Location.create(location)
    } catch (error) {
        throw error
    }
}

module.exports.getById = async function(id) {
    try {
        return await Location.findOne({ '_id': id })
    } catch (error) {
        throw error
    }
}

module.exports.getByName = async function(name) {
    try {
        return await Location.findOne({ 'name': name })
    } catch (error) {
        throw error
    }
}