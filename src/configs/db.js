const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const MONGO_URI = process.env.MONGO_URI

const db = async () =>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("connected to pidev database")
    } catch (error) {
        console.log(error)
    }
} 

module.exports = db