import React, { useState, useEffect } from 'react'
import "../componentsStyle/FeedPost.css"
import MiniProfile from './MiniProfile'

const FeedPost = ({ postData, userData }) => {
    const [likesData, setLikesData] = useState({ likes: postData.likes.length, isLiked: false });
    const [yourCmnt, setYourCmnt] = useState("");
    const [allCmnts, setAllCmnts] = useState([]);
    useEffect(() => {
        setPostData();
    }, [])

    const setPostData = () => {

        // For Post Likes
        const likesDataObjArr = postData.likes.filter(obj => obj.likedBy === userData._id);
        // we get new user if liked and if user has unliked it both in array but different isLiked ;
        if (likesDataObjArr.length > 0) {
            // Means liked by me
            setLikesData({ ...likesData, isLiked: true });
        } else {
            // Not liked
            setLikesData({ ...likesData, isLiked: false });
        }

        // For Post Comments
        // console.log(postData.comments)
        setAllCmnts(postData.comments);
    }

    const handleLikeBtn = async () => {
        try {
            const res = await fetch("/feedPostLike", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: userData._id, postId: postData.postId, isLiked: likesData.isLiked })
            });
            const data = await res.json();
            if (res.status === 200) {
                if (likesData.isLiked) {
                    // Liked hai or unlike krna hai
                    setLikesData({ likes: likesData.likes - 1, isLiked: false });
                } else {
                    // Unliked hai or like krna hai
                    setLikesData({ likes: likesData.likes + 1, isLiked: true });
                }

            } else {
                throw new Error("Try Again");
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleCommentBtn = (ele) => { document.getElementById(ele).focus(); }

    const handleCmntArea = (e) => {
        const value = e.target.value;
        setYourCmnt(value);
    }

    const handleSubmitCmnt = async (e) => {
        try {
            e.preventDefault();
            if (yourCmnt === "" || !yourCmnt) {
                return;
            } else {
                const res = await fetch("/submitPostCmnt", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ postId: postData.postId, comment: yourCmnt, commentedBy: userData._id, commenterName: userData.name })
                })
                const data = await res.json();
                console.log(data);
                if (res.status === 200) {
                    setAllCmnts([...allCmnts, { comment: yourCmnt, commentedBy: userData._id, commenterName: userData.name, _id: data.objId }]);
                    setYourCmnt("");
                } else {
                    throw new Error("Try Again");
                }
            }
        } catch (err) {
            console.log(err)
        }

    }

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
                    <i className="fa-solid fa-heart fa-2x" style={{ "color": "#e30d0d" }} onClick={handleLikeBtn}></i>
                </button>
                <button>
                    <i className="fa-solid fa-comment fa-2x" style={{ "color": "#0a64ff" }} onClick={() => handleCommentBtn(`commentHere-${postData.postId}`)}></i>
                </button>
            </div>

            <div className='postDetails'>
                {likesData.isLiked
                    ?
                    (postData.likes.length === 0 ?
                        `Liked by You || ${postData.comments.length} Comments`
                        : `Liked by ${likesData.likes - 1} others and You || ${postData.comments.length} Comments`)
                    :
                    (postData.likes.length === 0 ?
                        `${likesData.likes} like || ${postData.comments.length} Comments`
                        : `Liked by ${likesData.likes} others || ${postData.comments.length} Comments`)
                }
            </div>

            <div className='postTime'>
                {postData.date}
            </div>
            <div className="commentsSection">
                {allCmnts.map(obj => {
                    return (
                        <div className="comment" key={obj._id}>
                            {obj.commenterName} ➢ {obj.comment}
                            {obj.commentedBy === userData._id ?
                                <button style={{ "backgroundColor": "black", "border": "none" }}>
                                    <i className="fa-sharp fa-solid fa-trash" style={{ "color": "red" }}></i>
                                </button>
                                : ""}
                        </div>
                    )
                })}
            </div>

            <div className='postComment'>
                <form method='POST'>
                    <input type="text" placeholder='Comment here' id={`commentHere-${postData.postId}`} value={yourCmnt} onChange={handleCmntArea} />
                    <input type="submit" className="button-3" onClick={handleSubmitCmnt} />
                </form>
            </div>

        </div >
    )
}

export default FeedPost