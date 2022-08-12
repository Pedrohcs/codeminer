const resourceRepository = require('../repositories/resource')

module.exports.createResource = async function(newResource) {
    try {
        validateResource(newResource)

        return await resourceRepository.create(newResource)
    } catch (error) {
        console.error(`[createResource] Error creating Resource ${newResource.name} - ${newResource.weight}. ${error.message}`)
        throw error
    }
}

function validateResource(newResource) {
    if (!newResource.name)
        throw { code: 400, message: 'It is mandatory to inform the payload\'s name'}
    if (!newResource.weight)
        throw { code: 400, message: 'It is mandatory to inform the payload\'s weight'}
}
module.exports.validateResource = validateResource