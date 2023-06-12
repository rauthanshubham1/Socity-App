const express = require("express");
const User = require("../models/schema");
const router = express.Router();


// Login route or homepage route
router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await User.findOne({ email, password })
        if (existUser) {
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ error: "Invalid credentials " });
        }
    } catch (err) {
        console.log(err);
    }
})



// Signup route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const newUser = new User({ name, email, phone, password });
        await newUser.save();
        console.log(newUser);
        res.status(200).json({ msg: "dssc" })
    } catch (err) {
        console.log(err);
    }

})


module.exports = router;