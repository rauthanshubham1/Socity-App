const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Creating User Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts:
        [
            {
                date: {
                    type: Date,
                    default: Date.now
                },
                imageUrl: {
                    type: String,
                },
                likes: {
                    type: Number,
                    default: 0
                },
                comments: {
                    type: String,
                    default: 0
                },
            }
        ],
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    followers: [
        {
            followerId: {
                type: String,
                default: 0
            }
        }
    ],
    following: [
        {
            followingId: {
                type: String,
                default: 0
            }
        }
    ],
    profilePic: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
    }

})


userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 12);
        }
        next();
    } catch (err) {
        console.log(err);
    }
})

userSchema.methods.uploadPost = async function (imageUrl) {
    try {
        this.posts = [...this.posts, { imageUrl }];
        await this.save();
        return true;
    } catch (err) {
        console.log(err);
    }
}


userSchema.methods.generateToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRETKEY);
        this.tokens = [...this.tokens, { token: token }];
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;