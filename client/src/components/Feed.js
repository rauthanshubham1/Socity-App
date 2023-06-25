import React, { useEffect, useState } from 'react'
import FeedPost from './FeedPost'
import "../componentsStyle/Feed.css"
import Header from "./Header"
import { useNavigate } from 'react-router-dom'

const Feed = () => {
    const navigate = useNavigate();
    const [feedPosts, setFeedPosts] = useState([])
    const [userData, setUserData] = useState({})
    useEffect(() => {
        verifyUser();
        getFeedPosts();
    }, [])


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
            if (res.status !== 200) {
                const error = new Error(res.error)
                throw error;
            } else {
                setUserData(data);
            }


        } catch (err) {
            console.log(err);
            navigate("/");
        }
    }

    const getFeedPosts = async () => {
        try {
            const res = await fetch("/getFeedPosts", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            let data = await res.json();
            data = data.sort((a, b) => b.postId - a.postId);
            if (res.status !== 200) {
                const error = new Error(res.error)
                throw error;
            } else {
                setFeedPosts(data);
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header heading={"Your Feed"}></Header>
            {
                feedPosts.map(post => {
                    return (
                        <div className='feedContainer' key={post.postId}>
                            <FeedPost postData={post} userData={userData} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default Feed