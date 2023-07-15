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
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/searchUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email: userEmail })
            });
            const data = await res.json();
            if (res.status === 200) {
                console.log("User found");
                navigate("/searchedUser", { state: data });
            } else {
                alert("User doesn't exist");
                const error = new Error(data.error)
                throw error;
            }
        } catch (err) {
            console.log(err);
        }

    }

    const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/;

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const imgSrc = prompt("Enter the image source you want to upload");
            if (!imgSrc) { return }
            if (urlRegex.test(imgSrc)) {
                const res = await fetch(`${process.env.REACT_APP_ROUTE}/uploadPost`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ _id: userData._id, imageUrl: imgSrc })
                });

                const data = await res.json();
                if (res.status === 200) {
                    alert("Post Uploaded");
                    window.location.reload(false);
                } else {
                    const error = new Error(res.error)
                    throw error;
                }
            } else {
                alert("Invalid Url");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <nav className="navbar">
            <Link to="feed" title='Socity'>
                <img src={LogoNoBg} alt='' />
            </Link>
            <ul>
                <li>
                    <Link to="feed" title='Feed'>
                        <i className="fa-solid fa-house fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>
                <li>
                    <Link to="profile" title='Profile'>
                        <i className="fa-solid fa-user fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>
                <li>
                    <Link to="messages" title='Messages'>
                        <i className="fa-solid fa-message fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>
                {/* <li>
                    <Link to="explore">
                        <i className="fa-solid fa-earth-asia fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li> */}
                <li>
                    <Link to="upload" onClick={handleUpload} title='Upload Post'>
                        <i className="fa-solid fa-upload fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>
                <li>
                    <Link to="/search" onClick={handleSearch} title='Search User'>
                        <i className="fa-solid fa-magnifying-glass fa-lg" style={{ "color": "#ffffff" }} ></i>
                    </Link>
                </li>
                <li>
                    <Link to="/logout" title='Logout'>
                        <i className="fa-solid fa-right-from-bracket fa-lg" style={{ "color": "#ffffff" }}></i>
                    </Link>
                </li>

            </ul >
        </nav>
    )
}

export default NavBar


