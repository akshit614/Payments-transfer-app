const { User } = require("../DB");
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config");

const userMiddleware = async (req,res,next) => {

    try {
        const username = req.body.username;
        const password = req.body.password;
        
        const user = await User.findOne({
            username : username,
            password : password
        })
    
        if (user) {
            next();
        } else {
            res.status(403).json({
                msg : "User doesn't exist"
            })
        }
        
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error: error.message });

    }

}

const authMiddleware = (req,res,next) => {

    try {
        const authheader = req.headers.authorization;

        if (!authheader || !authheader.startswith('Bearer ')) { 
            res.json({
                msg : "Authorization header missing"
            })
        }

        const token = authheader.split(' ')[1];

        if (!token) {
            req.status(401).json({
                msg : "Token Missing"
            })
        }

        try {
            
            const decodedToken = jwt.verify(token, JWT_SECRET);
            req.userId = decodedToken.userId;

            next();

        } catch (error) {
            res.status(403).json(error);
        }


    }catch(error) {
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }

}

module.exports = {
    userMiddleware,
    authMiddleware
}