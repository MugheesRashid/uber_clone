const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
      minlength: [3, "first name must have 3 characters"]
   },
   lastName: {
      type: String,
      required: true,
      minlength: [3, "last name must have 3 characters"]
   },
   email: {
      type: String,
      required: true,
      minlength: [5, "Email must have 5 characters"]
   },
   socketId: {
      type: String,
   },
   password: {
      type: String,
      required: true,
      select: false,
   }
})

userSchema.methods.generateAuthToken = function () {
   const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
   return token;
}

userSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
   return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model("User", userSchema)

module.exports = userModel
