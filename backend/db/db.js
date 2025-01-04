const mongoose = require("mongoose");

function connectToDb() {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("Connected successfully");
        })
        .catch((err) => {
            console.error("Error connecting to the database:", err);
        });
}

module.exports = connectToDb;
