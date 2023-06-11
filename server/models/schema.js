const express = require("express");
const mongoose = require("mongoose");

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


const User = mongoose.model("User", userSchema);

module.exports = User;