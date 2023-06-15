import React, { useEffect, useState } from 'react'
import "../componentsStyle/Profile.css"
import Header from "./Header"
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const [user, setUser] = useState({ name: "", posts: [] });
    const navigate = useNavigate();
    useEffect(() => {
        verifyUser();
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

            const data = await res.json();
            if (res.status === 200) {
                setUser({ ...user, name: data.name, posts: data.posts });
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


    return (
        <>
            <Header heading="Your Profile" />
            <div className='profileContainer'>
                <div className='profileDetails'>
                    <div className='profileImg'>
                        <img src="https://plus.unsplash.com/premium_photo-1686174386454-1e303af1c90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80" alt="" />
                    </div>
                    <div className='accountData'>
                        <div className="userName">
                            <Header heading={user.name} />
                        </div>
                        <div className='data'>
                            <Header heading={`${user.posts.length} Posts`} />
                            <Header heading={"2912 Followers"} />
                            <Header heading={"12 Following"} />
                        </div>
                    </div>
                </div>
                <div className='accountPosts'>
                    {user.posts.map(post => {
                        return (
                            <div className="userPost">
                                <img src={post.imgUrl} alt="" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Profile