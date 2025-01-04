const captainModel = require("../models/captainModel")

module.exports.createCaptain = async ({
    firstName, lastName, email, password, vehicleType, plateNumber, capacity, location, phoneNumber
}) => {
    if (!firstName || !lastName || !email || !password || !vehicleType || !plateNumber || !capacity || !location || !phoneNumber) {
        throw new Error("All fields are required")
    }

    const captain = await captainModel.create({
        firstName, 
        lastName, 
        email, 
        password: password, 
        vehicle: {
            vehicleType: vehicleType,
            plateNumber: plateNumber,
            capacity: capacity
        },
        location: {
            lat: location.lat,
            lng: location.lng
        },
        phoneNumber: phoneNumber
    })
    return captain
}
