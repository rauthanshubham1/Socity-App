import React, { useEffect } from 'react'
import Header from "./Header"
import Inbox from "./Inbox"
import "../componentsStyle/AllMessages.css"
import { useNavigate } from "react-router-dom"

const AllMessages = () => {
    const navigate = useNavigate();
    useEffect(() => {
        verifyUser();
        document.title = "Socity - Messages";
    }, [])

    const verifyUser = async () => {
        try {
            const res = await fetch("/verifyUser", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            if (res.status === 200) {
                navigate("/user/messages")
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
            <Header heading="Your Messages" />
            <div className="inbox">
                <Inbox name={"User1"} url={"https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"} />
                <Inbox name={"User2"} url={"https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png"} />
                <Inbox name={"User3"} url={"https://w7.pngwing.com/pngs/490/157/png-transparent-male-avatar-boy-face-man-user-flat-classy-users-icon.png"} />
                <Inbox name={"User4"} url={"https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png"} />
                <Inbox name={"User5"} url={"https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"} />
                <Inbox name={"User6"} url={"https://cdn.icon-icons.com/icons2/2468/PNG/512/user_kids_avatar_user_profile_icon_149314.png"} />
            </div>
        </div>

    )
}

export default AllMessages