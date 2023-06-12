import React from 'react'
import "../componentsStyle/MiniProfile.css"

const MiniProfile = () => {
    return (
        <div className='miniProfile'>
            <div className='miniImg'>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
            </div>
            <div className='name'>
                Shubham Rauthan
            </div>
        </div>
    )
}

export default MiniProfile