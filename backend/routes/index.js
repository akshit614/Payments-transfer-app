const express = require("express");
const userRouter = require("./user");
const { authMiddleware } = require("../middlewares/user");
const { User } = require("../DB");
const {z} = require("zod")

const mainRouter = express.Router()

mainRouter.use("/user",userRouter)

module.exports = mainRouter