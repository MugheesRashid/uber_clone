const rideService = require('../service/ride.services');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { pickup, destination, vehicleType } = req.body;

    if (!pickup || !destination || !vehicleType) {
      return res.status(400).json({ error: 'Missing required fields in the request.' });
    }
    const user = req.user._id;
    const ride = await rideService.createRide(pickup, destination, vehicleType, user);
    return res.status(201).json(ride);
  } catch (error) {
    console.error('Error in createRide:', error.message);
    return res.status(500).json({ error: 'An internal server error occurred. Please try again later.' });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.body;
  const fare = await rideService.getFare(pickup, destination);
  return res.status(200).json({ fare });
};

