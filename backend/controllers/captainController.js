const captainModel = require("../models/captainModel")
const captainService = require("../service/captain.service")
const { validationResult } = require("express-validator")
const blackListTokenModel = require("../models/blackListTokenModel")

module.exports = {
    register: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
       const {firstName, lastName, email, password, vehicleType, plateNumber, capacity, lat, lng, phoneNumber} = req.body

       const isEmailExist = await captainModel.findOne({email})
       if (isEmailExist) return res.status(400).json({message: "Email already exists"})

       const hashedPassword = await captainModel.hashPassword(password)
       const captain = await captainService.createCaptain({firstName, lastName, email, password: hashedPassword, vehicleType, plateNumber, capacity, location: {lat: lat, lng: lng}, phoneNumber})
       const token = captain.generateAuthToken()
       res.status(201).json({message: "Captain registered successfully", token})
    },

    login: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email, password} = req.body
        const captain = await captainModel.findOne({email}).select("+password")
        if (!captain) return res.status(401).json({message: "Invalid email or password"})
        
        const isMatch = await captain.comparePassword(password)
        if (!isMatch) return res.status(401).json({message: "Invalid password"})
        const user = await captainModel.findOne({ email })
        const token = captain.generateAuthToken()
        res.cookie("token", token)
        res.status(200).json({message: "Logged in successfully", token, user})
    },

    profile: async (req, res) => {
        res.status(200).json(req.user)
    },
    
    logout: async (req, res) => {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

        await blackListTokenModel.create({ token });
    
        res.clearCookie('token');
    
        res.status(200).json({ message: 'Logout successfully' });
    }
}