const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const {getCordinates, getDistanceInfo, getSuggestions } = require('../controllers/mapController')
const { query } = require('express-validator')

router.get('/get-cordinates',
    [query('address').notEmpty().withMessage('Address is required')],
    authMiddleware.auth, getCordinates)

router.get('/get-distance-info',
    [query('origin').notEmpty().withMessage('Origin is required'),
    query('destination').notEmpty().withMessage('Destination is required')],
    authMiddleware.auth, getDistanceInfo)

router.get('/get-suggestions',
    [query('input').notEmpty().withMessage('Input is required')],
    authMiddleware.auth, getSuggestions)

module.exports = router