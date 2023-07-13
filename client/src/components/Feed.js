import React, { useEffect, useState } from 'react'
import FeedPost from './FeedPost'
import "../componentsStyle/Feed.css"
import Header from "./Header"
import { useNavigate } from 'react-router-dom'
import defaultFeed from "../assets/defaultFeed.png"

const Feed = () => {
    const navigate = useNavigate();
    const [feedPosts, setFeedPosts] = useState([])
    const [userData, setUserData] = useState({})
    useEffect(() => {
        verifyUser();
        getFeedPosts();
        document.title = "Socity - Feed";
    }, [])


    const verifyUser = async () => {
        try {
            const sessionTkn = (document.cookie).split("=")[1];
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/verifyUser`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ sessionTkn })
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
            const sessionTkn = (document.cookie).split("=")[1];
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/getFeedPosts`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ sessionTkn })
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
                feedPosts.length === 0 ?
                    <img className="defaultFeedImg" src={defaultFeed} alt="" />
                    :
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