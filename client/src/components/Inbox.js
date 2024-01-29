import React from 'react'
import "../componentsStyle/Inbox.css"
import { useNavigate } from 'react-router-dom'

const Inbox = ({ name, url, roomId, authorName, totalMsg, globalChatsName, user_name }) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/getGlobalChatMessages`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ roomId })
            })

            const data = await res.json();
            if (res.status === 200) {
                const allMessages = data;
                navigate("/user/chats", { state: { allMessages, roomId, chatName: globalChatsName, user_name } });
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='parentMsgContainer'
            onClick={handleClick}>

            <div className="infoContainer">
                <div className="avatar">
                    <img src={url} alt="Avatar" />
                </div>
                <div className="info">
                    <h4>{name}</h4>
                </div>
            </div>
            <div className="messageContainer">
                <h6>Created by : {authorName}  |  Total Messages : {totalMsg.length}</h6>
            </div >
        </div >
    )
}

export default Inbox