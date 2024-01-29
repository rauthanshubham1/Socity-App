import React, { useEffect, useState } from 'react'
import Header from './Header'
import "../componentsStyle/chats.css"
import { useLocation, useNavigate } from "react-router-dom"
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000")

const Chats = () => {
    const [textBoxMsg, setTextBoxMsg] = useState("")
    const [joinRoom, setJoinedRoom] = useState(false);

    const location = useLocation();
    const allMessages = location.state.allMessages.allMessages;
    const roomId = location.state.roomId;
    const chatName = location.state.chatName;
    const user_name = location.state.user_name;

    const navigate = useNavigate();

    const [allMessagesArray, setAllMessagesArray] = useState(allMessages);

    // useEffect(() => {
    //     document.querySelector(".chatsContainer").scrollTo(0, 1000000);
    //     socket.on("message_received", ({ sender, message }) => {
    //         setAllMessagesArray([...allMessagesArray, { sender, message }]);
    //     })
    // }, [socket])

    useEffect(() => {
        document.querySelector(".chatsContainer").scrollTo(0, 1000000);
        socket.on("message_received", ({ sender, message }) => {
            setAllMessagesArray(prevState => [...prevState, { sender, message }]);
        });
    }, [socket]);

    const handleJoinRoom = () => {
        if (joinRoom) {
            setJoinedRoom(false);
            socket.emit("leave_room", roomId);
        } else {
            setJoinedRoom(true);
            socket.emit("join_room", roomId);
        }
    }

    const handleInputText = (e) => {
        const value = e.target.value;
        setTextBoxMsg(value);
    }

    const sendMsg = (e) => {
        e.preventDefault();
        if (joinRoom) {
            socket.emit("send_message", { message: textBoxMsg, roomId: roomId, sender: user_name });
            setAllMessagesArray([...allMessagesArray, { sender: user_name, message: textBoxMsg }]);
            setTextBoxMsg("");
        } else {
            console.log("Please join the room")
        }
    }

    return (
        <div>
            <button className="button-24" onClick={() => navigate(-1)}>
                Go Back
            </button>

            <Header heading={"All Messages"} />

            <div className='parentChatsContainer'>

                <div className='senderProfile'>
                    {chatName}
                </div>

                <div className='chatsContainer'>
                    {/* <div className='right'>Hello</div>
                    <div className='left'>How are you bro</div>
                    <div className='right'>Hello</div>
                    <div className='left'>How are you bro</div>
                    <div className='right'>Hello</div>
                    <div className='left'>How are you bro</div> */}

                    {allMessagesArray.map((MsgObj, index) => {
                        return (
                            <div className='right' key={index}>{MsgObj.sender} : {MsgObj.message}</div>
                        )
                    })}

                </div>
            </div>
            <div >
                {
                    joinRoom ? <div style={{ "color": "red", "fontWeight": "900" }}>Leave the room before closing the chats</div>
                        : <div style={{ "color": "green", "fontWeight": "900" }}>Join the room to send message</div>
                }
                <button className="button-10" type="button" onClick={handleJoinRoom}>{joinRoom ? "Leave Room" : "Join Room"}</button>
                <form className='msgTextBox' onSubmit={sendMsg}>
                    <input type="text" name='msg' placeholder='Type your message here' value={textBoxMsg} onChange={handleInputText} autoComplete='off' />

                    <button className="button-10" type="submit">Send</button>
                </form>
            </div>

        </div >
    )
}

export default Chats;