import React from 'react'
import FeedPost from './FeedPost'
import "../componentsStyle/Feed.css"
import Header from "./Header"

const Feed = () => {
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