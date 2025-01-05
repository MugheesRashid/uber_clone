const userModel = require("../models/user")
const jwt = require("jsonwebtoken")
const blackListTokenModel = require("../models/blackListTokenModel")
const captainModel = require("../models/captainModel")

module.exports.auth = async (req, res, next) => {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1]
    if(!token) return res.status(401).json({message: "Unauthorized"})
    
    const blackListToken = await blackListTokenModel.findOne({token})
    if(blackListToken) return res.status(401).json({message: "Unauthorized token"})
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        let user = await userModel.findById(decoded._id).select("+password")
        if(!user) {
            user = await captainModel.findById(decoded._id).select("+password")
        }
        if(!user) {
            return res.status(401).json({message: "User not found"})
        }
        req.user = user
        next()
    } catch (err) {
        res.status(500).json({message: "Internal server error", error: err.message})
    }

}
