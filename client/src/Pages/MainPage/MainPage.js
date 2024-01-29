import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { Outlet, useNavigate } from "react-router-dom"
import "./MainPage.css"
import AccSuggestion from '../../components/AccSuggestion'
import Header from '../../components/Header'
import Loading from "../../assets/Loading.gif"

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
            const sessionTkn = document.cookie.split(";")[1].split("=")[1];
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/verifyUser`, {
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
            document.querySelector(".loadingContainer").style.display = "flex";
            const sessionTkn = document.cookie.split(";")[1].split("=")[1];
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/suggestUsers`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ sessionTkn })
            });
            const data = await res.json();
            document.querySelector(".loadingContainer").style.display = "none";
            if (res.status === 200) {
                setSuggestedUsers(data);
            } else {
                document.querySelector(".loadingContainer").style.display = "none";
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
                    <div className='loadingContainer'>
                        <img src={Loading} alt="" className='loading' />
                    </div>
                    {
                        suggestedUsers.map(user => {
                            return <AccSuggestion searchedUserData={user} key={user._id} />
                        })
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