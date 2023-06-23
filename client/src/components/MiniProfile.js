import React from 'react'
import "../componentsStyle/MiniProfile.css"

const MiniProfile = ({ postData }) => {
    return (
        <div className='miniProfile'>
            <div className='miniImg'>
                <img src={postData.ownerPic} alt="" />
            </div>
            <div className='name'>
                {postData.owner}
            </div>
        </div>
    )
}

export default MiniProfile