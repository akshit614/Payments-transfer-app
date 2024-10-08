const express = require("express");
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config");
const { User, Account } = require("../DB");
const {z} = require("zod")
const authMiddleware = require("../middlewares/user");
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
        const userId = dbUser._id;

        await Account.create({
            userId,
            balance : 1 + Math.random() * 10000
        })

        const token = jwt.sign({
            userId
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

const userSigninSchema = z.object({
    username : z.string(),
    password : z.string()
})

userRouter.post('/signin',authMiddleware, async (req,res) => {

    const verifiedResult = userSigninSchema.safeParse(req.body)

    if (!verifiedResult.success) {
        res.status(411).json({
            msg : "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    if (user) {
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET)

        res.json({
            msg : "Signin Successfully",
            Token : token
        })
    }

    res.status(411).json({
        message : "Error while signing in"
    })

})

const updateInfoSchema = z.object({
    firstname : z.string(),
    lastname : z.string(),
    password : z.string()
})

userRouter.put('/update',authMiddleware, async (req,res) => {

    const result = updateInfoSchema.safeParse(req.body)
    if (!result.success) {
        res.status(400).json({
            msg : "Incorrect input"
        })
    }

    try {
        
        await User.updateOne(req.body, {
            id : req.userId
        })
        res.json({
            msg : "Info Updated Successfully"
        })

    } catch (error) {
        res.status(403).json("" ,error);
    }
})

module.exports = userRouter