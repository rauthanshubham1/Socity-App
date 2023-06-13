import React from 'react'
import "../componentsStyle/FeedPost.css"
import MiniProfile from './MiniProfile'

const FeedPost = (props) => {
    return (
        <div className='feedPostContainer'>
            <div>
                <MiniProfile />
            </div>
            <div className='feedPost'>
                <img src={props.imgSrc} alt="" />
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