const RefillFuel = require('../models/refillFuel')

module.exports.create = async function(refillFuel) {
    try {
        return await RefillFuel.create(refillFuel)
    } catch (error) {
        throw error
    }
}