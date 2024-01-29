import React, { useEffect, useState } from 'react'
import "../componentsStyle/Profile.css"
import Header from "./Header"
import { useNavigate } from "react-router-dom"
import Loading from "../assets/Loading.gif"

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
            document.querySelector(".loadingContainer").style.display = "flex";
            const sessionTkn = document.cookie.split(";")[1].split("=")[1];
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/verifyUser`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ sessionTkn })
            });

            let data = await res.json();
            document.querySelector(".loadingContainer").style.display = "none";
            data.userData.posts = data.userData.posts.sort((a, b) => Number(b.postId) - Number(a.postId));
            if (res.status === 200) {
                setUser({
                    ...user,
                    _id: data.userData._id,
                    name: data.userData.name,
                    posts: data.userData.posts,
                    followers: data.userData.followers,
                    following: data.userData.following,
                    profilePic: data.userData.profilePic
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
                document.querySelector(".loadingContainer").style.display = "flex";
                const res = await fetch(`${process.env.REACT_APP_ROUTE}/changeProfilepicture`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ _id: user._id, dpLink })

                })
                const data = await res.json();
                document.querySelector(".loadingContainer").style.display = "none";
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
            <div className='loadingContainer'>
                <img src={Loading} alt="" className='loading' />
            </div>
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