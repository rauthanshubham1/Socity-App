const jwt = require("jsonwebtoken");
const User = require("../models/schema");

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.sessionTkn;
        const verifyUser = jwt.verify(token, process.env.SECRETKEY);
        const rootUser = await User.findOne({ _id: verifyUser._id, "tokens.token": token })
        if (!rootUser) {
            throw new Error("User not found");
        }
        req.token = token;
        req.userData = rootUser;
        req.userID = rootUser._id;
        next();
    } catch (err) {
        res.status(401).send("Unauthorized: No token provided");
        console.log(err);
    }
}
module.exports = authentication;