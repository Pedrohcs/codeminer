const Location = require('../models/location')

module.exports.create = async function(location) {
    try {
        return await Location.create(location)
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