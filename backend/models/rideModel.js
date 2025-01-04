const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    captain: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    distance: { type: Number, required: true },
    duration: { type: Number, required: true },
    vehicleType: { type: String, required: true },
    status: { type: String, required: true, default: 'pending', enum: ['pending', 'accepted', 'ongoing', 'cancelled', 'completed'] },
    paymentId: { type: String },
    orderId: { type: String },
    signature: { type: String},
    fare: { type: Number, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Ride', rideSchema)
