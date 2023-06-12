import React from 'react'
import NavBar from '../../components/NavBar'
import "./MainPage.css"
import AccSuggestion from '../../components/AccSuggestion'
import Header from '../../components/Header'
import Feed from '../../components/Feed'
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
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                    <AccSuggestion />
                </div>
                <div className='feed'>
                    <Feed/>
                </div>
            </div>
        </div>
    )
}

export default MainPage