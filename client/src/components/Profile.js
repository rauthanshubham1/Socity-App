import React from 'react'
import "../componentsStyle/Profile.css"
import Header from "./Header"

const Profile = () => {
    return (
        <>
            <Header heading="Your Profile" />
            <div className='profileContainer'>
                <div className='profileDetails'>
                    <div className='profileImg'>
                        <img src="https://plus.unsplash.com/premium_photo-1686174386454-1e303af1c90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80" alt="" />
                    </div>
                    <div className='accountData'>
                        <div className="userName">
                            <Header heading={"Shubham Rauthan"} />
                        </div>
                        <div className='data'>
                            <Header heading={" 10 Posts"} />
                            <Header heading={"2912 Followers"} />
                            <Header heading={"12 Following"} />
                        </div>
                    </div>
                </div>
                <div className='accountPosts'>
                    <div className="userPost">
                        <img src="https://plus.unsplash.com/premium_photo-1686174386454-1e303af1c90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80" alt="" />
                    </div>
                    <div className="userPost">
                        <img src="https://images.unsplash.com/photo-1686240202847-e1c3b5eaa153?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" />
                    </div>
                    <div className="userPost">
                        <img src="https://plus.unsplash.com/premium_photo-1686174386454-1e303af1c90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80" alt="" />
                    </div>
                    <div className="userPost">
                        <img src="https://plus.unsplash.com/premium_photo-1686174386454-1e303af1c90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80" alt="" />
                    </div>
                    <div className="userPost">
                        <img src="https://plus.unsplash.com/premium_photo-1686174386454-1e303af1c90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80" alt="" />
                    </div><div className="userPost">
                        <img src="https://plus.unsplash.com/premium_photo-1686174386454-1e303af1c90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile