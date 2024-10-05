const mongoose = require("mongoose")
const { string, number } = require("zod")

mongoose.connect("mongodb+srv://akkisingh8266:6TzworwGp7t7JEzl@paymentsappcluster.xwv7d.mongodb.net/App")

const userSchema = new mongoose.Schema({
    username : { 
        type: String, required: true , unique : true
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
})

const balanceSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId, ref : 'USer', required : true
    },
    balance : {
        type : Number, required : true
    }
})

const User = mongoose.model('User',userSchema)
const Account = mongoose.model('Account',balanceSchema)

module.exports = {User, Account} 