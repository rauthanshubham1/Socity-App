import React from 'react'
import "../componentsStyle/NavBar.css"
import { Link } from 'react-router-dom'
import LogoNoBg from "../assets/LogoNoBg.png"
const NavBar = () => {

    const handleSearch = () => {
        const userEmail = prompt("Enter the email of the person you want to search");
    }

    return (
        <nav className="navbar">
            <Link to="/">
                <img src={LogoNoBg} alt='' />
            </Link>
            <ul>
                <li>
                    <Link to="/feed">
                        <i className="fa-solid fa-house fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>
                <li>
                    <Link to="/youraccount">
                        <i className="fa-solid fa-user fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>
                <li>
                    <Link to="/messages">
                        <i className="fa-solid fa-message fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <i className="fa-solid fa-earth-asia fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <i className="fa-solid fa-magnifying-glass fa-lg" style={{ "color": "#ffffff" }} onClick={handleSearch}></i>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <i className="fa-solid fa-right-from-bracket" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>

            </ul >
        </nav>
    )
}

export default NavBar