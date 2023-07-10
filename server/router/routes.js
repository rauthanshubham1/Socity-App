const express = require("express");
const User = require("../models/schema");
const router = express.Router();
const bcrypt = require("bcrypt");
const authentication = require("../middleware/auth")
const cookieParser = require("cookie-parser");
router.use(cookieParser());

// For checking connectivity
router.get("/isLive", (req, res) => {
    return res.status(200).send("Backend is Live")
})

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
                return res.status(200).json({ "message": "Login successful", "sessionTkn": token });
            } else {
                return res.status(401).json({ "error": "Invalid credentials " });
            }
        } else {
            return res.status(401).json({ "error": "User not exist" });
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
            return res.status(422).json({ "error": "Phone Number already exists" });
        }
        const newUser = new User({ name, email, phone, password });
        await newUser.save();
        console.log(newUser);
        return res.status(201).json({ "message": "User registered successfully" })
    } catch (err) {
        console.log(err);
    }
})

// Feed post
router.get("/getFeedPosts", authentication, async (req, res) => {
    try {
        const userFollowing = req.userData.following;
        const tempArr = [];
        userFollowing.forEach(obj => { tempArr.push(obj.followingId) });
        const tempArr2 = await User.find({ _id: tempArr });
        const result = []
        tempArr2.forEach(obj => result.push(...obj.posts));
        res.status(200).send(result);
    } catch (err) {
        console.log(err);
    }
})

// Verify User
router.get('/verifyUser', authentication, (req, res) => {
    res.status(200).send(req.userData);
});


// Upload Post
router.post("/uploadPost", async (req, res) => {
    try {
        const { _id, imageUrl } = req.body;
        if (!_id || !imageUrl) { return res.status(400).json({ "error": "Incomplete Data" }) };
        const user = await User.findOne({ _id });
        const result = await user.uploadPost(imageUrl);
        if (result) {
            return res.status(200).json({ "Message": "Post Uploaded" })
        } else {
            return res.status(400).json({ "error": "Try Again" })
        }
    } catch (err) {
        console.log(err);
    }
})

// Search User
router.post("/searchUser", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) { return res.status(400).json({ "error": "Incomplete Data" }) };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(200).send(user)
        } else {
            return res.status(400).json({ "error": "User doesn't exist" })
        }
    } catch (err) {
        console.log(err);
    }
})

// Check follow status
router.post("/checkFollowStatus", authentication, async (req, res) => {
    try {
        const userData = req.userData;
        const searchedUserData = req.body;
        if (!searchedUserData.event) {
            // Use Effect will use this
            //  check if follow or not
            const newUserData = await User.findOne({ _id: (userData._id).toString() });
            //  give searched user followers count
            const newSearchedUser = await User.findOne({ _id: (searchedUserData._id) });
            const result = newUserData.following.find(user => user.followingId === searchedUserData._id);
            if (!result) {
                // Unfollow hai searched user
                return res.status(404).send({ newUserData, newSearchedUser });
            } else {
                // Follow
                return res.status(200).send({ newUserData, newSearchedUser });
            }
        } else {
            // onclick will use this
            if (searchedUserData.followStatus) {
                // IT means following so make it unfollow
                await userData.toggleFollowing(searchedUserData, searchedUserData.followStatus);
                const newSearchedUserData = await User.findOne({ _id: searchedUserData._id });
                await newSearchedUserData.toggleFollower(userData, searchedUserData.followStatus);
                const sendSearchedUserData = await User.findOne({ _id: searchedUserData._id });
                res.status(200).send(sendSearchedUserData);
            }
            else {
                // IT means not following so make it follow
                await userData.toggleFollowing(searchedUserData, searchedUserData.followStatus);
                const newSearchedUserData = await User.findOne({ _id: searchedUserData._id });
                await newSearchedUserData.toggleFollower(userData, searchedUserData.followStatus);
                const sendSearchedUserData = await User.findOne({ _id: searchedUserData._id });
                res.status(200).send(sendSearchedUserData);
            }
        }
    } catch (err) {
        console.log(err);
    }
})


// Suggest account
router.get("/suggestUsers", authentication, async (req, res) => {
    try {
        const userData = req.userData;
        const tempArr1 = [...userData.following]
        const tempArr2 = tempArr1.map(obj => obj.followingId);
        const tempArr3 = [...tempArr2, userData._id.toString()];
        const arrOfOtherUsers = await User.find({ _id: { $nin: tempArr3 } });
        res.status(200).send(arrOfOtherUsers);

    } catch (err) {
        console.log(err);
    }
})

// Feed post likes
router.post("/feedPostLike", async (req, res) => {
    try {
        const { _id, postId, isLiked } = req.body;
        const user = await User.findOne({ "posts.postId": postId });
        const result = await user.togglePostLike(_id, postId, isLiked);
        res.status(200).json({ "message": result });
    } catch (err) {
        console.log(err)
    }
})

// Feed post comments
router.post("/submitPostCmnt", async (req, res) => {
    try {
        const { postId, comment, commentedBy, commenterName } = req.body;
        const user = await User.findOne({ "posts.postId": postId });
        const objId = await user.addCmnt(postId, comment, commentedBy, commenterName)
        res.status(200).json({ "objId": objId });
    } catch (err) {
        console.log(err)
    }
})

// Delete Comment
router.post("/deleteCmnt", async (req, res) => {
    try {
        const { commentedBy, commenterName, postId, _id, comment } = req.body;
        const user = await User.findOne({ "posts.postId": postId });
        const allCmntsAfterDeletion = await user.deleteCmnt(commentedBy, commenterName, postId, _id, comment);
        res.status(200).send(allCmntsAfterDeletion);

    } catch (err) {
        console.log(err)
    }
})

// Change Profile Picture
router.post("/changeProfilepicture", async (req, res) => {
    try {
        const { _id, dpLink } = req.body;
        if (!dpLink) {
            return res.status(404).json({})
        }
        const user = await User.findOne({ _id });
        const newUserData = await user.changeProfilepicture(dpLink);
        return res.status(200).send(newUserData);

    } catch (err) {
        console.log(err)
    }
})

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
