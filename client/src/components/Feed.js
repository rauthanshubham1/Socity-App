import React from 'react'
import FeedPost from './FeedPost'
import "../componentsStyle/Feed.css"
import Header from "./Header"

const Feed = () => {
    return (
        <>
            <Header heading={"Your Feed"}></Header>
            <div className='feedContainer'>
                <FeedPost />
            </div>
            <div className='feedContainer'>
                <FeedPost />
            </div>
            <div className='feedContainer'>
                <FeedPost />
            </div>

        </>
    )
}

export default Feed