const userModel = require("../models/user")
const { validationResult } = require("express-validator")
const userService = require("../service/user.sevice")
const blackListTokenModel = require("../models/blackListTokenModel")
module.exports = {
    register: async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

        const {email, firstName, lastName, password} = req.body
        const hashedPassword = await userModel.hashPassword(password)
        const user = await userService.createUser({
            firstname: firstName,
            lastname: lastName,
            email,
            password: hashedPassword
        })

        const token = await user.generateAuthToken()
        res.status(201).json({user, token})
    },
    login : async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
        
        const {email, password} = req.body
        const user = await userModel.findOne({email}).select("+password")
        if(!user) return res.status(401).json({message: "Invalid credentials"})

        const isMatch = await user.comparePassword(password)
        if(!isMatch) return res.status(401).json({message: "Invalid credentials"})
        const token = await user.generateAuthToken()
        res.cookie("token", token)
        res.status(200).json({user, token})
    },
    profile: async(req, res) => {
        res.status(200).json(req.user)
    },
    logout: async(req, res) => {
        res.clearCookie("token")

        const token = req.cookies.token || req.headers.authorization
        await blackListTokenModel.create({token})
        res.status(200).json({message: "Logged out successfully"})
    }
}