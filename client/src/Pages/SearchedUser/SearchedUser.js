import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import "../../componentsStyle/Profile.css"

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
            const res = await fetch("/checkFollowStatus", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(searchedUserData)
            })
            const data = await res.json();
            if (res.status === 200) {
                setIsFollowed(true);
                setNewSearchedUserData(data.newSearchedUser);

            } else {
                setIsFollowed(false);
                setNewSearchedUserData(data.newSearchedUser);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleFollowBtn = async (searchedUserData) => {
        try {
            const res = await fetch("/checkFollowStatus", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ ...searchedUserData, event: "Button Clicked", followStatus: isFollowed })
            })
            const data = await res.json();
            checkFollowStatus();
            setIsFollowed(!isFollowed);
            setNewSearchedUserData(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className='searchedUserContainer' style={{ "background": "#c8c8c8", "padding": "40px" }}>
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
                            searchedUserData.posts.map(post => {
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