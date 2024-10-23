const express = require("express")
const accountRouter = express.Router()
const authMiddleware = require("../middlewares/user");
const { Account } = require("../DB");
const { default: mongoose } = require("mongoose");

accountRouter.get('/balance', authMiddleware, async (req,res) => {

    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance : account.balance
    })
})


// Good solution using transaction 
accountRouter.post('/transfer', authMiddleware, async (req,res) => {

    const session = await mongoose.startSession();

    session.startTransaction();
    const {to, amount} = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session)
    if(!account){
        res.status(400).json({ message : "account not found" })
    }

    if (account.balance < amount) {
        session.abortTransaction();
        res.status(400).json({ message : "Insufficient balance" })
    }

    const toAccount = await Account.findOne({
        userId : to
    }).session(session)
    
    if (!toAccount) {
        session.abortTransaction();
        res.status(400).json({ message : "Invalid account" })
    }

    await Account.updateOne({
        userId: req.userId
    },{
        $inc : { balance : -amount }
    }).session(session)
    
    await Account.updateOne({
        userId: to
    },{
        $inc : { balance : amount }
    }).session(session)

    session.commitTransaction();
    res.status(200).json({ message : "Transaction Successful" })

})


// Bad solution without using transaction if database goes down it wont work 
// accountRouter.post('/transfer', authMiddleware, async (req,res) => {
//     const {to, ammount} = req.body;

//     const account = await Account.findOne({
//         userId: req.userId
//     })

//     if (account.balance < ammount) {
//         res.status(400).json({
//             message : "Insufficient balance"
//         })
//     }

//     const toAccount = await Account.findOne({
//         userId : to
//     })

//     if (!toAccount) {
//         res.status(400).json({
//             message : "Invalid account" 
//         })
//     }

//     await Account.updateOne({
//         userId: req.userId
//     },{
//         $inc : {
//             balance : -ammount
//         }
//     })
    
//     await Account.updateOne({
//         userId: to
//     },{
//         $inc : {
//             balance : ammount
//         }
//     })

//     res.status(200).json({
//         message : "Transaction Successful"
//     })

// })
 
module.exports = accountRouter