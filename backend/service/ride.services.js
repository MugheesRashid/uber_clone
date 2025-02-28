const rideModel = require('../models/rideModel');
const mapServices = require('./map.service');
const { sendMessage } = require('../socket');


const otpGenerator = async () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Ensure 6 digits
  return otp;
};

const generateTimeAndDistance = async (stringTime, stringDistance) => {
  const distance = parseFloat(stringDistance.replace(/[^0-9.]/g, "")) * 1000; // Remove any non-numeric characters
  const duration =
    (/(\d+)\s*hour/i.exec(stringTime)?.[1] || 0) * 3600 +
    (/(\d+)\s*min/i.exec(stringTime)?.[1] || 0) * 60;
  return { distance, duration };
};

const getFare = async (origin, destination) => {
  const rates = {
    bike: { baseFare: 20, perKm: 5, perMinute: 2 },
    auto: { baseFare: 30, perKm: 10, perMinute: 3 },
    car: { baseFare: 50, perKm: 15, perMinute: 5 },
  };

  const distanceInfo = await mapServices.getDistanceInfo(origin, destination);
  // Ensure the required data exists
  const Distance = distanceInfo?.distance?.text
  const Duration = distanceInfo?.duration?.text
  if (!Distance || !Duration) {
    throw new Error("Invalid distance information received from map services.");
  }

  const { distance, duration } = await generateTimeAndDistance(
    Duration,
    Distance
  );

  const distanceNum = distance / 1000;
  const timeNum = duration / 60;

  if (isNaN(distanceNum) || isNaN(timeNum) || distanceNum < 0 || timeNum < 0) {
    throw new Error("Distance and time must be valid, non-negative values.");
  }

  // Calculate fares for all vehicle types
  const fares = {};
  for (const [vehicleType, { baseFare, perKm, perMinute }] of Object.entries(rates)) {
    fares[vehicleType] = baseFare + perKm * distanceNum + perMinute * timeNum;
  }

  return fares;
};

module.exports.createRide = async (pickup, destination, vehicleType, user) => {
  if (!pickup || !destination || !vehicleType) {
    throw new Error("Invalid request. Missing required parameters.");
  }

  try {
    const distanceInfo = await mapServices.getDistanceInfo(pickup, destination);
    const Distance = distanceInfo?.distance?.text;
    const Duration = distanceInfo?.duration?.text;
    const { distance, duration } = await generateTimeAndDistance(
      Duration,
      Distance
    );

    const fare = await getFare(pickup, destination);
    if (!fare || fare <= 0) {
      throw new Error("Failed to calculate fare.");
    }

    const otp = await otpGenerator();

    const ride = new rideModel({
      pickup,
      user,
      destination,
      vehicleType,
      fare: fare[vehicleType],
      otp,
      distance,
      duration,
    });

    await ride.save();

    return ride;
  } catch (error) {
    console.error("Error creating ride:", error);
    throw new Error("Failed to create ride. Please try again later.");
  }
};

module.exports.confirmRide = async (rideId, captainId) => {
  const ride = await rideModel.findById(rideId).populate('user');
  if (!ride) {
    throw new Error("Ride not found");
  }
  ride.captain = captainId;
  ride.status = 'accepted';
  await ride.save();
  const finalRide = await rideModel.findById(rideId).populate('user').populate('captain');

  sendMessage(finalRide, ride.user.socketId, 'rideAccepted')

  return finalRide;
}

module.exports.startRide = async (rideId, otp) => {
  const ride = await rideModel.findById(rideId).populate('user').populate('captain');
  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status !== 'accepted') {
    throw new Error("Ride not accepted");
  }
  if (ride.status === 'ongoing') {
    throw new Error("Ride already started");
  }
  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }
  ride.status = 'ongoing';
  await ride.save();
  sendMessage(ride, ride.user.socketId, 'rideStarted')
  return ride;
}

module.exports.finishRide = async (rideId, captain) => {
  try {
    const ride = await rideModel.findOne({_id: rideId, captain}).populate('user').populate('captain');
    if (!ride) {
      throw new Error("Ride not found");
    }
    if (ride.status !== 'ongoing') {
      throw new Error("Ride not ongoing");
    }
    if (ride.status === 'completed') {
      throw new Error("Ride already completed");
    }
    ride.status = 'completed';
    await ride.save();
    return ride;
  } catch (error) {
    console.log(error)
    throw new Error("Failed to finish ride. Please try again later.");
  }
}

module.exports.getFare = getFare;

