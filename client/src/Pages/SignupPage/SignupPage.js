import React, { useState } from 'react'
import "./SignupPage.css"
import LogoNoBg from "../../assets/LogoNoBg.png"
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [userData, setUserData] = useState({ name: "", email: "", phone: "", password: "", cPassword: "" })
    const navigate = useNavigate();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const { name, email, phone, password, cPassword } = userData;
            if (!name || !email || !phone || !password || !cPassword) {
                window.alert("Please fill all fields");
                return;
            }
            if (password !== cPassword) {
                window.alert("Password and confirm Password does not match!");
                setUserData({ ...userData, password: "", cPassword: "" });
                return;
            }
            console.log(JSON.stringify({ name, email, phone, password }));
            const res = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, phone, password })
            })

            const data = await res.json();
            console.log(data);
            if (res.status === 201) {
                window.alert(data.message);
                navigate("/")
            } else {
                window.alert(data.error);
                setUserData({ name: "", email: "", phone: "", password: "", cPassword: "" })
            }
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            <div className='signupFormContainer'>
                <img src={LogoNoBg} alt="Logo not available" />
                <form method='post' className='formStyling'>
                    <div className='formItem'>
                        <input type="text" placeholder='Name' name="name" value={userData.name} onChange={handleInput} required />
                    </div>
                    <div className='formItem'>
                        <input type="text" placeholder='Email' name="email" value={userData.email} onChange={handleInput} required />
                    </div>
                    <div className='formItem'>
                        <input type="text" placeholder='Phone' name="phone" value={userData.phone} onChange={handleInput} required />
                    </div>
                    <div className='formItem'>
                        <input type="password" placeholder='Password' name="password" value={userData.password} onChange={handleInput} required />
                    </div>
                    <div className='formItem'>
                        <input type="text" placeholder='Confirm Password' name='cPassword' value={userData.cPassword} onChange={handleInput} required />
                    </div>
                    <div className='formItem'>
                        <button type='submit' className="button-22" onClick={submitForm}>Sign Up</button>
                    </div>
                </form>

                <div className='logIn'>
                    Have an account?  &nbsp;
                    <a href="/">Login</a>
                </div>

            </div >
        </>
    )
}

export default SignupPage