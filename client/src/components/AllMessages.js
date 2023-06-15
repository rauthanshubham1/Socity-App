import React, { useEffect } from 'react'
import Header from "./Header"
import Inbox from "./Inbox"
import "../componentsStyle/AllMessages.css"
import { useNavigate } from "react-router-dom"

const AllMessages = () => {
    const navigate = useNavigate();
    useEffect(() => {
        verifyUser();
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
        <>
            <Header heading="Your Messages" />
            <div className="inbox">
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
                <Inbox />
            </div>
        </>

    )
}

export default AllMessages