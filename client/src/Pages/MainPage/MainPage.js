import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { Outlet, useNavigate } from "react-router-dom"
import "./MainPage.css"
import AccSuggestion from '../../components/AccSuggestion'
import Header from '../../components/Header'

const MainPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    useEffect(() => {
        verifyUser();
        suggestAccount();
    }, [])

    const verifyUser = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/verifyUser`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            if (res.status === 200) {
                setUserData(data)
                navigate("/user/feed")
            } else {
                const error = new Error(res.error)
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate("/");
        }
    }

    const suggestAccount = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/suggestUsers`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            if (res.status === 200) {
                setSuggestedUsers(data);
            } else {
                const error = new Error(res.error)
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container">
            <div className='upperContainer'>
                <NavBar userData={userData} />
            </div>
            <div className='lowerContainer'>
                <div className='suggestions'>
                    <Header heading="Suggested for you" />
                    {
                        suggestedUsers.map(user => {
                            return <AccSuggestion searchedUserData={user} key={user._id} />
                        }
                        )
                    }
                </div>
                <div className='feed'>
                    <Outlet>
                    </Outlet>
                </div>
            </div>
        </div>
    )
}


export default MainPage