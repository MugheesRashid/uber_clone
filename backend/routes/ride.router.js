const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const { createRide, getFare } = require('../controllers/rideControllers')
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
module.exports = router