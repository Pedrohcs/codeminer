const Travel = require('../models/travel')

module.exports.create = async function(travel) {
    try {
        return await Travel.create(travel)
    } catch (error) {
        throw error
    }
}