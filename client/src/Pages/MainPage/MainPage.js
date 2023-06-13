import React from 'react'
import NavBar from '../../components/NavBar'
import { Route, Routes } from "react-router-dom"
import "./MainPage.css"
import AccSuggestion from '../../components/AccSuggestion'
import Header from '../../components/Header'
import Feed from '../../components/Feed'
import Profile from '../../components/Profile'
import AllMessages from '../../components/AllMessages'
const MainPage = () => {
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

                    <Routes>
                        <Route exact path='/feed' element={<Feed />}></Route>
                        <Route exact path='/youraccount' element={<Profile />}></Route>
                        <Route exact path='/messages' element={<AllMessages />}></Route>
                        <Route exact path='' element=""></Route>
                        <Route exact path='' element=""></Route>
                    </Routes>



                    {/* <Feed /> */}
                    {/* <Profile /> */}

                </div>
            </div>
        </div>
    )
}


export default MainPage