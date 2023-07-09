import React, { useEffect, useState } from 'react'
import "../componentsStyle/Profile.css"
import Header from "./Header"
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const [user, setUser] = useState({
        name: "",
        posts: [],
        followers: [],
        following: [],
        profilePic: "",
        _id: ""
    });
    const navigate = useNavigate();
    useEffect(() => {
        verifyUser();
        document.title = "Socity - Profile";
    }, []);

    const verifyUser = async () => {
        try {
            const res = await fetch("/verifyUser", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            let data = await res.json();
            data.posts = data.posts.sort((a, b) => Number(b.postId) - Number(a.postId));
            if (res.status === 200) {
                setUser({
                    ...user,
                    _id: data._id,
                    name: data.name,
                    posts: data.posts,
                    followers: data.followers,
                    following: data.following,
                    profilePic: data.profilePic
                });

                navigate("/user/profile");
            } else {
                const error = new Error(res.error)
                throw error;
            }

        } catch (err) {
            console.log(err);
            navigate("/");
        }
    }

    const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/;

    const changeDp = async () => {
        try {
            const dpLink = prompt("Enter the link of the image you want as your profile pic");
            if (dpLink === "" || !dpLink) { return; }
            if (urlRegex.test(dpLink)) {
                const res = await fetch("/changeProfilepicture", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ _id: user._id, dpLink })

                })
                const data = await res.json();
                if (res.status === 200) {
                    setUser({
                        _id: data._id,
                        name: data.name,
                        posts: data.posts,
                        followers: data.followers,
                        following: data.following,
                        profilePic: data.profilePic
                    })
                } else {
                    throw new Error("Try Again");
                }
            } else {
                alert("Invalid Url")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Header heading="Your Profile" />
            <div className='profileContainer'>
                <div className='profileDetails'>
                    <div className='profileImg'>
                        <img src={user.profilePic} alt="" />
                    </div>
                    <div className='accountData'>
                        <div className="userName">
                            <Header heading={user.name} />
                        </div>
                        <div className='data'>
                            <Header heading={`${user.posts.length} Posts`} />
                            <Header heading={`${user.followers.length} Followers`} />
                            <Header heading={`${user.following.length} Following`} />
                            <button className="button-34" onClick={changeDp} >Change Profile Picture</button>
                        </div>
                    </div>
                </div>
                <div className='accountPosts'>
                    {
                        user.posts.map(post => {
                            return (
                                <div className="userPost" key={post._id} >
                                    <img
                                        src={post.imageUrl}
                                        alt=""
                                        title={`${post.date} || ${post.likes.length} Likes || ${post.comments.length} Comments`}
                                    />

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Profile