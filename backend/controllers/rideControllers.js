const rideService = require('../service/ride.services');
const { validationResult } = require('express-validator');
const { sendMessage } = require('../socket')
const mapServices = require('../service/map.service')
const rideModel = require('../models/rideModel')

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


    const pickUpCordinated = await mapServices.getAddressCoordinates(pickup)
    const captainsInRadius = await mapServices.getCaptainLocationRadius(pickUpCordinated.lat, pickUpCordinated.lng, 10)

    captainsInRadius.map(async (captain) => {
      sendMessage(await rideModel.findById(ride._id).populate('user'), captain.socketId, 'newRide')
    })
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

module.exports.confirmRide = async (req, res) => {
  try {
  const { rideId, captainId } = req.body;
  const ride = await rideService.confirmRide(rideId, captainId);
  return res.status(200).json(ride);
  } catch (error) {
    console.log(error)
    return res.status(500).json({error})
  }
  
}

module.exports.startRide = async (req, res) => {
  try {
    const { otp, rideId } = req.body;
    console.log(otp, rideId)
    const ride = await rideService.startRide(rideId, otp);
    return res.status(200).json(ride);
  } catch (error) {
    console.log(error)
    return res.status(500).json({error})
  }
}

