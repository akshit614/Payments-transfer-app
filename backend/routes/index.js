const express = require("express");
const userRouter = require("./user");
const { authMiddleware } = require("../middlewares/user");
const { User } = require("../DB");
const {z} = require("zod");
const accountRouter = require("./account");

const mainRouter = express.Router()

mainRouter.use("/user", userRouter)
mainRouter.use("/account", accountRouter)

mainRouter.get('/users', async (req,res) => {

    const filter = req.query.filter || "";

    const users = await User.find({
        $or : [{
            firstname : {
                "$regex" : filter,
                "$options": "i" 
            }
        },{
            lastname : {
                "$regex" : filter,
                "$options": "i" 
            }
        }]
    })

    res.status(200).json({
        user : users.map(user => ({
            Username : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            _id: user._id
        }))
    })
    
})

module.exports = mainRouter