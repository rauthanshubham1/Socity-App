import React, { useState } from 'react'
import "./LoginPage.css";
import loginPageImg from "../../assets/loginPageImg.png"
import LogoNoBg from "../../assets/LogoNoBg.png"
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [userData, setUserData] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = userData;
            if (!email || !password) {
                window.alert("Please fill all fields");
                return;
            }
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                window.alert(data.message);
                navigate("/user/feed");
            } else {
                window.alert(data.error);
                setUserData({ email: "", password: "" })
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className='loginPageContainer'>

                <div className='phoneImageContainer'>
                    <img src={loginPageImg} alt="Not available" />
                </div>

                <div className='loginFormContainer'>

                    <img src={LogoNoBg} alt="Logo not available" />

                    <form action="" className='formStyling'>
                        <div className='formItem'>
                            <input type="text" placeholder='Email' name="email" value={userData.email} onChange={handleInput} required />
                        </div>
                        <div className='formItem'>
                            <input type="password" placeholder='Password' name="password" value={userData.password} onChange={handleInput} required />
                        </div>
                        <div className='formItem'>
                            <button type='submit' className="button-22" onClick={submitForm} >Login</button>
                        </div>
                    </form>

                    <div className='signUp'>
                        Don't have an account? &nbsp; <Link to="/signup">Sign up</Link>
                    </div>
                </div>


            </div>
        </>
    )
}

export default LoginPage