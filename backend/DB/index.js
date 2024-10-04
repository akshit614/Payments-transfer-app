const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://akkisingh8266:6TzworwGp7t7JEzl@paymentsappcluster.xwv7d.mongodb.net/App")

const userSchema = new mongoose.Schema({
    username : { type: String, required: true , unique : true},
    firstname : { type: String, required: true },
    lastname : { type: String, required: true },
    password : { type: String, required: true }
})

const User = mongoose.model('User',userSchema)

module.exports = {User}