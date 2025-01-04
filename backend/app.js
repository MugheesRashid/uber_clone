const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const connectToDb = require("./db/db")
const userRoutes = require("./routes/user.routes")
const captainRoutes = require("./routes/captain.routes")
const mapRoutes = require("./routes/map.router")
const rideRoutes = require("./routes/ride.router")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
connectToDb()


app.use("/users", userRoutes)
app.use("/captains", captainRoutes)
app.use("/map", mapRoutes)
app.use("/ride", rideRoutes)

module.exports = app