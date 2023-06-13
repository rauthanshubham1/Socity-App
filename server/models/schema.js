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
                },
                comments: {
                    type: String,
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
    ]
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

userSchema.methods.generateToken = async function () {
    try {
        const token =  jwt.sign({ _id: this._id }, process.env.SECRETKEY);
        this.tokens = [...this.tokens, { token: token }];
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;