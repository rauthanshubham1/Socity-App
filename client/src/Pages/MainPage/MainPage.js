import React from 'react'
import NavBar from '../../components/NavBar'
import { Outlet, useNavigate } from "react-router-dom"
import "./MainPage.css"
import AccSuggestion from '../../components/AccSuggestion'
import Header from '../../components/Header'

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className='upperContainer'>
                <NavBar />
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
    )
}


export default MainPage