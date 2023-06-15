import React from 'react'
import "../componentsStyle/NavBar.css"
import { Link, useNavigate } from 'react-router-dom'
import LogoNoBg from "../assets/LogoNoBg.png"
const NavBar = () => {
    const handleSearch = (e) => {
        e.preventDefault();
        const userEmail = prompt("Enter the email of the person you want to search");
    }
    const handleUpload = (e) => {
        e.preventDefault();
        const imgSrc = prompt("Enter the image source you want to upload");
    }

    return (
        <nav className="navbar">
            <Link to="feed">
                <img src={LogoNoBg} alt='' />
            </Link>
            <ul>
                <li>
                    <Link to="feed">
                        <i className="fa-solid fa-house fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>
                <li>
                    <Link to="profile">
                        <i className="fa-solid fa-user fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>
                <li>
                    <Link to="messages">
                        <i className="fa-solid fa-message fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>
                <li>
                    <Link to="upload" onClick={handleUpload}>
                        <i className="fa-solid fa-upload fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>
                {/* <li>
                    <Link to="explore">
                        <i className="fa-solid fa-earth-asia fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li> */}
                <li>
                    <Link to="/search" onClick={handleSearch}>
                        <i className="fa-solid fa-magnifying-glass fa-lg" style={{ "color": "#ffffff" }} ></i>
                    </Link>
                </li>
                <li>
                    <Link to="/logout" >
                        <i className="fa-solid fa-right-from-bracket fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>

            </ul >
        </nav>
    )
}

export default NavBar


