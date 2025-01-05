const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const { createRide, getFare, confirmRide, startRide } = require('../controllers/rideControllers')
const { body } = require('express-validator')

router.post('/create-ride',
    [
    body('pickup').notEmpty().withMessage('Pickup location is required'),
    body('destination').notEmpty().withMessage('Drop location is required'),
    body('vehicleType').notEmpty().withMessage('Vehicle type is required'),
    ],
    authMiddleware.auth, createRide)
router.post('/get-fare',
    [
    body('pickup').notEmpty().withMessage('Pickup location is required'),
    body('destination').notEmpty().withMessage('Drop location is required'),
    ],
    authMiddleware.auth, getFare)

router.post('/confirm-ride',
    [
    body('rideId').notEmpty().withMessage('Ride ID is required'),
    body('captainId').notEmpty().withMessage('Captain ID is required'),
    ],
    authMiddleware.auth, confirmRide)

router.post('/start-ride',
    [
    body('otp').notEmpty().withMessage('OTP is required'),
    body('rideId').notEmpty().withMessage('Ride Id is required')
    ],
    authMiddleware.auth, startRide)

module.exports = router