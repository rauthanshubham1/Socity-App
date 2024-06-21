import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import "../../componentsStyle/Profile.css"
import Loading from "../../assets/Loading.gif"

const SearchedUser = () => {
    const location = useLocation();
    const searchedUserData = location.state;
    const navigate = useNavigate();
    const [isFollowed, setIsFollowed] = useState(false);
    const [newSearchedUserData, setNewSearchedUserData] = useState(searchedUserData);

    useEffect(() => {
        checkFollowStatus();
    }, [])

    const checkFollowStatus = async () => {
        try {
            document.querySelector(".loadingContainer").style.display = "flex";
            const sessionTkn = document.cookie.split(";")[0].split("=")[1];
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/checkFollowStatus`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ searchedUserData: searchedUserData, sessionTkn: sessionTkn, event: "Page Load" })
            })
            let data = await res.json();
            document.querySelector(".loadingContainer").style.display = "none";
            data.newSearchedUser.posts = data.newSearchedUser.posts.sort((a, b) => Number(b.postId) - Number(a.postId));
            if (res.status === 200) {
                setIsFollowed(data.isFollowed);
                setNewSearchedUserData(data.newSearchedUser);
            }
        } catch (err) {
            document.querySelector(".loadingContainer").style.display = "none";
            console.log(err);
        }
    }

    const handleFollowBtn = async (searchedUserData) => {
        try {
            document.querySelector(".loadingContainer").style.display = "flex";
            const sessionTkn = document.cookie.split(";")[0].split("=")[1];
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/checkFollowStatus`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ searchedUserData: searchedUserData, event: "Button Clicked", followStatus: isFollowed, sessionTkn: sessionTkn })
            })
            const data = await res.json();
            document.querySelector(".loadingContainer").style.display = "none";
            checkFollowStatus();
            setIsFollowed(!isFollowed);
            setNewSearchedUserData(data);
        } catch (err) {
            document.querySelector(".loadingContainer").style.display = "none";
            console.log(err);
        }
    }

    return (
        <>
            <div className='searchedUserContainer' style={{ "background": "#c8c8c8", "padding": "40px" }}>
                <div className='loadingContainer'>
                    <img src={Loading} alt="" className='loading' />
                </div>
                <button className="button-24" onClick={() => navigate(-1)}>
                    Go Back
                </button>
                <Header heading={`${newSearchedUserData.name} Profile`} />
                <div className='profileContainer'>
                    <div className='profileDetails'>
                        <div className='profileImg'>
                            <img src={newSearchedUserData.profilePic} alt="" />
                        </div>
                        <div className='accountData'>
                            <div className="userName">
                                <Header heading={newSearchedUserData.name} />
                            </div>
                            <div className='data'>
                                <Header heading={`${newSearchedUserData.posts.length} Posts`} />
                                <Header heading={`${newSearchedUserData.followers.length} Followers`} />
                                <Header heading={`${newSearchedUserData.following.length} Following`} />
                                <button className="button-24" onClick={() => handleFollowBtn(searchedUserData)}>
                                    {isFollowed ? "Following" : "Follow"}
                                </button>

                            </div>
                        </div>
                    </div>
                    <div className='accountPosts'>
                        {
                            newSearchedUserData.posts.map(post => {
                                return (
                                    <div className="userPost" key={post._id} >
                                        <img src={post.imageUrl} alt="" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchedUser