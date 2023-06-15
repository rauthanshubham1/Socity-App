const express = require("express");
const User = require("../models/schema");
const router = express.Router();
const bcrypt = require("bcrypt");
const authentication = require("../middleware/auth")
const cookieParser = require("cookie-parser");
router.use(cookieParser());

// Login route or homepage route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ "error": "Please fill all the form fields" });
        }
        const existUser = await User.findOne({ email });
        if (existUser) {
            const checkPassword = await bcrypt.compare(password, existUser.password);
            if (checkPassword) {
                const token = await existUser.generateToken();
                res.cookie("sessionTkn", token, {
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true
                });
                return res.status(200).json({ "message": "Login successful" });
            } else {
                return res.status(401).json({ "error": "Invalid credentials " });
            }
        } else {
            return res.status(401).json({ "error": "Invalid credentials " });
        }
    } catch (err) {
        console.log(err);
    }
})


// Signup route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            return res.status(422).json({ "error": "Please fill all fields" });
        }
        const existUser1 = await User.findOne({ email });
        if (existUser1) {
            return res.status(422).json({ "error": "Email already exists" });
        }
        const existUser2 = await User.findOne({ phone });
        if (existUser2) {
            return res.status(422).json({ "error": "PhoneNumber already exists" });
        }
        const newUser = new User({ name, email, phone, password });
        await newUser.save();
        console.log(newUser);
        return res.status(201).json({ "message": "User registered successfully" })
    } catch (err) {
        console.log(err);
    }
})

// Feed page
router.get("/profile", authentication, async (req, res) => {
    try {
        const userData = req.userData;
        if (!(userData._id)) {
            return res.status(404).json({ "error": "page not found" });
        }
        const userName = userData.name;
        const userPosts = userData.posts;
        return res.status(200).send({ userName, userPosts });
    } catch (err) {
        console.log(err);
    }

})


// Verify User
router.get('/verifyUser', authentication, (req, res) => {
    res.status(200).send(req.userData);
});


// Logout User
router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("sessionTkn", { path: "/" });
        res.status(200).json({ "message": "User Logged Out" });
    } catch (error) {
        console.log(err);
    }
})
module.exports = router;
