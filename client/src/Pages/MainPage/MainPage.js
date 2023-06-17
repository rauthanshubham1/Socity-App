import React, { useEffect, useState, createContext } from 'react'
import NavBar from '../../components/NavBar'
import { Outlet, useNavigate } from "react-router-dom"
import "./MainPage.css"
import AccSuggestion from '../../components/AccSuggestion'
import Header from '../../components/Header'
const UserDataContext = createContext();
const MainPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
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

    return (
        <UserDataContext.Provider value={userData} >
            <div className="container">
                <div className='upperContainer'>
                    <NavBar userData={userData} />
                </div>
                <div className='lowerContainer'>
                    <div className='suggestions'>
                        <Header heading="Suggested for you" />
                        <AccSuggestion />
                        <AccSuggestion />
                        <AccSuggestion />
                        <AccSuggestion />

                    </div>
                    <div className='feed'>
                        <Outlet>
                        </Outlet>
                    </div>
                </div>
            </div>
        </UserDataContext.Provider>
    )
}


export default MainPage
export { UserDataContext };