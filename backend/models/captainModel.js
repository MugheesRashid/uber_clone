const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const captainSchema = new mongoose.Schema({
    firstName: {type: String, required: true, minlength: [3, "First name must be at least 3 characters long"]},
    lastName: {type: String, required: true, minlength: [3, "Last name must be at least 3 characters long"]},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    socketId: {type: String},
    status: {type: String, enum: ["online", "offline"], default: "offline"},
    vehicle: {
        vehicleType: {type: String, required: true, enum: ["car", "bike", "auto"]},
        plateNumber: {type: String, required: true},
        capacity: {type: Number, required: true},
    },
    location: {
        lat: {type: Number},
        lng: {type: Number}
    },
    phoneNumber: {type: String, required: true}
})

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
    return token
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const captainModel = mongoose.model("Captain", captainSchema)

module.exports = captainModel
