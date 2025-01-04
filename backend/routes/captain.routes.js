const express = require("express")
const router = express.Router()
const captainController = require("../controllers/captainController")
const authMiddleware = require("../middleware/auth.middleware")
const { body } = require("express-validator")

router.post("/register", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min: 8}).withMessage("Password must be at least 8 characters long"),
    body("firstName").isLength({min: 3}).withMessage("First name must be at least 3 characters long"),
    body("lastName").isLength({min: 3}).withMessage("Last name must be at least 3 characters long"),
    body("vehicleType").notEmpty().withMessage("Vehicle type is required"),
    body("plateNumber").notEmpty().withMessage("Plate number is required"),
    body("capacity").isInt({min: 1}).withMessage("Capacity must be a positive integer")
], captainController.register)

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min: 8}).withMessage("Password must be at least 8 characters long")
], captainController.login)

router.get("/profile", authMiddleware.auth, captainController.profile)

router.get("/logout", authMiddleware.auth, captainController.logout)

module.exports = router