import React from 'react'
import "../componentsStyle/FeedPost.css"
import MiniProfile from './MiniProfile'

const FeedPost = ({ postData }) => {
    return (
        <div className='feedPostContainer'>
            <div>
                <MiniProfile postData={postData} />
            </div>
            <div className='feedPost'>
                <img src={postData.imageUrl} alt="" />
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
                {postData.likes} Likes and {postData.comments} Comments
            </div>

            <div className='postTime'>
                {postData.date}
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