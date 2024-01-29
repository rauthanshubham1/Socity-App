import React, { useEffect, useState } from 'react'
import Header from "./Header"
import Inbox from "./Inbox"
import "../componentsStyle/AllMessages.css"
import { useNavigate } from "react-router-dom"


const AllMessages = () => {
    const navigate = useNavigate();
    const [globalChatName, setGlobalChatName] = useState("");
    const [globalChats, setGlobalChats] = useState([]);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        showGlobalChats();
        document.title = "Socity - Messages";
    }, [])

    const setGlobalChatArea = (e) => {
        const value = e.target.value;
        setGlobalChatName(value);
    }

    const createGlobalChat = async (e) => {
        try {
            e.preventDefault();
            if (globalChatName === "") { 
                alert("Please name the global chats");
                return;
            }
            const sessionTkn = document.cookie.split(";")[1].split("=")[1];
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/addNewGlobalChats`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ globalChatName, sessionTkn })
            })
            const data = await res.json();
            if (res.status === 200) {
                setGlobalChats([...globalChats, data])
                setGlobalChatName("");
            } else {
                throw new Error("Cannot create new global chat");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const showGlobalChats = async () => {
        try {
            const sessionTkn = document.cookie.split(";")[1].split("=")[1];
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/getGlobalChats`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ sessionTkn })
            });
            const data = await res.json();

            if (res.status === 200) {
                setGlobalChats(data.allGlobalChats);
                setUserData(data.userData);
                navigate("/user/messages");
            } else {
                const error = new Error(res.error)
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate("/");
        }
    }

    return (
        <div className='allMsgs'>
            <Header heading="Global Chats" />
            <form className='formStyling'>
                <div className='formItem'>
                    <input type="text" placeholder='Enter name of new global chat' name="email" value={globalChatName} autoComplete='off' onChange={setGlobalChatArea} />
                    <button className="button-3" type='submit' onClick={createGlobalChat}>Create new global chat</button>
                </div>
            </form>

            <div className="inbox">

                {

                    globalChats.slice(0).reverse().map(
                        (chat, index) => {
                            return (
                                <Inbox key={index} name={chat.globalChatsName} url={"https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"} roomId={chat.roomId} authorName={chat.authorName} totalMsg={chat.messages} globalChatsName={chat.globalChatsName} user_name={userData.name} />
                            )
                        }
                    )
                }

            </div>

        </div>

    )
}

export default AllMessages