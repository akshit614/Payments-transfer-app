const mongoose = require("mongoose")
const { string, number } = require("zod")
require("dotenv").config({
    path : '.env'
})

const conncetDb = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected successfully")
    } catch (error) {
        console.error("Database connection error:", error)
        process.exit(1)
    }
}
conncetDb()

const userSchema = new mongoose.Schema({
    username : { 
        type: String, required: true , unique : true, index : true
    },
    firstname : { 
        type: String, required: true , trim : true
    },
    lastname : { 
        type: String, required: true, trim : true 
    },
    password : { 
        type: String, required: true, minLength : 8 
    }
}, { timestamps: true })

const balanceSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true
    },
    balance : {
        type : Number, required : true
    }
}, { timestamps: true })

const User = mongoose.model('User',userSchema)
const Account = mongoose.model('Account',balanceSchema)

module.exports = {User, Account} 