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
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts:
        [
            {
                postId: {
                    type: String,
                    unique: true,
                },
                owner: {
                    type: String,
                },
                ownerPic: {
                    type: String,
                    default: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
                },
                date: {
                    type: String,
                    default: function () {
                        return new Date().toLocaleDateString('en-US', {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric"
                        });
                    }
                },
                imageUrl: {
                    type: String,
                },
                likes: [
                    {
                        likedBy: {
                            type: String,
                        },
                    }
                ],
                comments: [
                    {
                        commentedBy: {
                            type: String
                        },
                        commenterName: {
                            type: String
                        },
                        comment:
                        {
                            type: String
                        }

                    }
                ],
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

userSchema.pre('save', async function (next) {
    try {
        this.posts.forEach(post => {
            if (!post.postId) {
                post.postId = Date.now().toString();
            }
        });
        next();
    } catch (err) {
        console.log(err);
    }
});

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
        this.posts = [...this.posts, { imageUrl, owner: this.name }];
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

userSchema.methods.toggleFollowing = async function (searchedUserData, followStatus) {
    try {
        if (followStatus) {
            // means we want to unfollow
            this.following = this.following.filter(obj => { return (obj.followingId !== searchedUserData._id) })
            await this.save();
            return false;
        } else {
            // means we want to follow
            this.following = [...this.following, { followingId: searchedUserData._id }];
            await this.save();
            return true;
        }
    } catch (err) {
        console.log(err);
    }
}
userSchema.methods.toggleFollower = async function (userData, followStatus) {
    try {
        if (followStatus) {
            // means we want to unfollow
            this.followers = this.followers.filter(obj => (obj.followerId !== (userData._id).toString()))
            await this.save();
            return false;
        } else {
            // means we want to follow
            this.followers = [...this.followers, { followerId: userData._id }];
            await this.save();
            return true;
        }
    } catch (err) {
        console.log(err);
    }
}

userSchema.methods.togglePostLike = async function (_id, postId, isLiked) {
    try {
        if (!isLiked) {
            // Means post is liked by user
            this.posts = this.posts.filter(post => {
                if (post.postId === postId) {
                    post.likes = [...post.likes, { likedBy: _id }];
                    return true;
                }
                return true;
            })
            await this.save();
            return "Liked the post";
        } else {
            // Means post is unliked by user
            this.posts = this.posts.filter(post => {

                if (post.postId === postId) {
                    post.likes = post.likes.filter(obj => {
                        if (obj.likedBy === _id) {
                            return false;
                        }
                        return true;
                    })
                    return true;
                }
                return true;
            })
            await this.save();
            return "Uniked the post";
        }
    } catch (err) {
        console.log(err);
    }
}

userSchema.methods.addCmnt = async function (postId, comment, commentedBy, commenterName) {
    try {
        this.posts = this.posts.filter(post => {
            if (post.postId === postId) {
                post.comments = [...post.comments, { comment, commentedBy, commenterName }];
                return true;
            }
            return true;
        })
        await this.save();
        const objId = this.posts[this.posts.length - 1]._id;
        return objId;
    } catch (err) {
        console.log(err);
    }
}

userSchema.methods.deleteCmnt = async function (commentedBy, commenterName, postId, _id, comment) {
    try {
        this.posts = this.posts.filter(post => {
            if (post.postId.toString() === postId) {
                post.comments = post.comments.filter(cmnt => {
                    if (cmnt._id.toString() === _id) {
                        return false;
                    }
                    return true;
                })
                return true;
            }
            return true;
        });
        await this.save();
        const allCmntsAfterDeletion = this.posts.find(post => post.postId.toString() === postId)
        return allCmntsAfterDeletion.comments

    } catch (err) {
        console.log(err)
    }
}
const User = mongoose.model("User", userSchema);

module.exports = User;