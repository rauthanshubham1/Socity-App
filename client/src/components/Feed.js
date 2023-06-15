import React, { useEffect } from 'react'
import FeedPost from './FeedPost'
import "../componentsStyle/Feed.css"
import Header from "./Header"
import { useNavigate } from 'react-router-dom'

const Feed = () => {
    const navigate = useNavigate();
    useEffect(() => {
        verifyUser();
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
            }

        } catch (err) {
            console.log(err);
            navigate("/");
        }
    }

    return (
        <>
            <Header heading={"Your Feed"}></Header>
            <div className='feedContainer'>
                <FeedPost imgSrc="https://images.unsplash.com/photo-1686245535496-277ecf86ae2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" />
            </div>

            <div className='feedContainer'>
                <FeedPost imgSrc="https://images.unsplash.com/photo-1686240202847-e1c3b5eaa153?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" />
            </div>
            <div className='feedContainer'>
                <FeedPost />
            </div>

        </>
    )
}

export default Feed