import React from 'react'
import "./LoginPage.css";
import loginPageImg from "../../assets/loginPageImg.png"
import LogoNoBg from "../../assets/LogoNoBg.png"

const LoginPage = () => {
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
                            <input type="text" placeholder='Email' />
                        </div>
                        <div className='formItem'>
                            <input type="text" placeholder='Password' />
                        </div>
                        <div className='formItem'>
                            <button type='submit' className="button-22">Login</button>
                        </div>
                    </form>
                    <div className='signUp'>
                        Don't have an account? &nbsp;
                        <a href="/">Sign up</a>
                    </div>
                </div>


            </div>
        </>
    )
}

export default LoginPage