import React from 'react'
import "../componentsStyle/AccSuggestion.css"
import { useNavigate } from 'react-router-dom'
const AccSuggestion = ({ searchedUserData }) => {
    const navigate = useNavigate()

    const handleSuggestedUser = () => {
        navigate("/searchedUser", { state: searchedUserData })
    }

    return (
        <div>
            <div className='suggestedAcc' onClick={handleSuggestedUser}>
                <div className='imgContainer'>
                    <img src={searchedUserData.profilePic} alt="" />
                </div>
                <div className='nameContainer'>
                    {searchedUserData.name}
                </div>
            </div>
        </div>
    )
}

export default AccSuggestion