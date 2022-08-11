const Resource = require('../models/resource')

module.exports.create = async function(resource) {
    try {
        return await Resource.create(resource)
    } catch (error) {
        if (error.errors && error.errors.name && error.errors.name.kind === 'enum')
            throw { code: 406, message: "The payload name must be one of the following: 'minerals', 'water', 'food'"}
        else
            throw error
    }
}

module.exports.getById = async function(id) {
    try {
        return await Resource.findOne({ '_id' : id })
    } catch (error) {
        throw error
    }
}