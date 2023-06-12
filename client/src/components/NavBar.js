import React from 'react'
import "../componentsStyle/NavBar.css"
const NavBar = () => {
    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li>
                        <a href="/">
                            <i className="fa-solid fa-house fa-lg" style={{ "color": "#ffffff" }}></i>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <i className="fa-solid fa-user fa-lg" style={{ "color": "#ffffff" }}></i>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <i className="fa-solid fa-message fa-lg" style={{ "color": "#ffffff" }}></i>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <i className="fa-solid fa-earth-asia fa-lg" style={{ "color": "#ffffff" }}></i>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <i className="fa-solid fa-magnifying-glass fa-lg" style={{ "color": "#ffffff" }}></i>
                        </a>
                    </li>

                </ul>
            </nav>
        </div >
    )
}

export default NavBar