const express = require("express");
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config");
const { User } = require("../DB");
const {z} = require("zod")
const authMiddleware = require("../middlewares/user");
const userMiddleware = require("../middlewares/user");

const userRouter = express.Router()

const userSchema = z.object({
    username : z.string(),
    firstname : z.string(),
    lastname : z.string(),
    password : z.string()
})

userRouter.post('/signup', async (req,res) => {
    
    const body = req.body;

    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            msg : "Input incorrect"
        })
    } 
    
    try {

        const user = await User.findOne({
            username : body.username
        })

        if (user) {
            return res.json({
                msg : "Username already exists"
            })
        }

        const dbUser = await User.create(body);

        const token = jwt.sign({
            userId : dbUser._id
        }, JWT_SECRET)


        res.status(200).json({ 
            msg : "user created successsfully",
            token : token   
        })
    } catch (error) {
        console.error("Error during user creation",error);
        return res.status(500
               
        )
    }
})

// userRouter.get('/signin', (req,res) => {

//     res.send("Hiii")

// })


module.exports = userRouter