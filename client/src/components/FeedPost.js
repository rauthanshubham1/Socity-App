import React from 'react'
import "../componentsStyle/FeedPost.css"
import MiniProfile from './MiniProfile'

const FeedPost = () => {
    return (
        <div className='feedPostContainer'>
            <div>
                <MiniProfile />
            </div>
            <div className='feedPost'>
                <img src="https://images.unsplash.com/photo-1686245535496-277ecf86ae2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="" />
            </div>

            <div className='postActions'>
                <button>
                    <i className="fa-solid fa-heart fa-2x" style={{ "color": "#e30d0d" }}></i>
                </button>
                <button>
                    <i className="fa-solid fa-comment fa-2x" style={{ "color": "#0a64ff" }}></i>
                </button>
            </div>

            <div className='postDetails'>
                1 Likes and 2 Comments
            </div>

            <div className='postTime'>
                {Date()}
            </div>
            <div className='commentArea'>
                {Date()}
            </div>
            <div className='commentArea'>
                {Date()}
            </div>

            <div className='postComment'>
                <form action="">
                    <input type="text" placeholder='Comment here' />
                    <input type="submit" className="button-3" />
                </form>
            </div>

        </div >
    )
}

export default FeedPost