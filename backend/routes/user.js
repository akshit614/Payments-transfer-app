const express = require("express");
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config");
const { User, Account } = require("../DB");
const {z} = require("zod")
const authMiddleware = require("../middlewares/user");
const userRouter = express.Router()

const userSchema = z.object({
    username : z.string().min(1, "String cannot be empty"),
    firstname : z.string().min(1, "String cannot be empty"),
    lastname : z.string().min(1, "String cannot be empty"),
    password : z.string().min(1, "String cannot be empty"),
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
            balance : (1 + Math.random() * 10000).toFixed(2)
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
    username : z.string().min(1, "String cannot be empty"),
    password : z.string().min(1, "String cannot be empty")
})

userRouter.post('/signin', async (req,res) => {

    try {

        const verifiedResult = userSigninSchema.safeParse(req.body)

        if (!verifiedResult.success) {
            return res.status(411).json({
                msg : "Incorrect inputs"
            })
        }

        const user = await User.findOne({
            username : req.body.username,
            password : req.body.password
        })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const isPasswordValid = await req.body.password === user.password
        
        if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET)
    
        return res.status(200).json({
            msg : "Signin Successfully",
            Token : token
        })

    } catch (error) {
        return res.status(500).json({
            message : "Error while signing in " + error.message
        }) 
    }
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