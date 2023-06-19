import React from 'react'
import "../componentsStyle/NavBar.css"
import { Link, useNavigate } from 'react-router-dom'
import LogoNoBg from "../assets/LogoNoBg.png"
const NavBar = ({ userData }) => {

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const userEmail = prompt("Enter the email of the person you want to search");
            if (!userEmail) { return }
            const res = await fetch("/searchUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: userEmail })
            });
            const data = await res.json();
            if (res.status === 200) {
                console.log("User found");
                navigate("/searchedUser", { state: data });
            } else {
                const error = new Error(res.error)
                throw error;
            }
        } catch (err) {
            console.log(err);
        }

    }
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const imgSrc = prompt("Enter the image source you want to upload");
            if (!imgSrc) { return }
            const res = await fetch("/uploadPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: userData._id, imageUrl: imgSrc })
            });

            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                console.log("Post Uploaded");
            } else {
                const error = new Error(res.error)
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
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


