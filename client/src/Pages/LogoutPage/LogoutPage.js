import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logoutUser();
    }, [])

    const logoutUser = async (e) => {
        try {
            const expires = new Date(Date.now() + 500);
            document.cookie = `sessionTkn=;path=/;expires=${expires}`
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/logout`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            if (res.status === 200) {
                navigate("/");
            } else {
                navigate("/user/feed");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <></>
    )
}

export default LogoutPage