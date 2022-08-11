module.exports.checkFuel = function(ship, travelRoute) {
    return ship.fuelLevel >= travelRoute.fuelUnits
}