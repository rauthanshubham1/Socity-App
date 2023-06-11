import React from 'react'
import "./SignupPage.css"
import LogoNoBg from "../../assets/LogoNoBg.png"
const SignupPage = () => {
    return (
        <>
            <div className='signupFormContainer'>

                <img src={LogoNoBg} alt="Logo not available" />

                <form action="" className='formStyling'>
                    <div className='formItem'>
                        <input type="text" placeholder='Name' />
                    </div>
                    <div className='formItem'>
                        <input type="text" placeholder='Email' />
                    </div>
                    <div className='formItem'>
                        <input type="text" placeholder='Phone' />
                    </div>
                    <div className='formItem'>
                        <input type="text" placeholder='Password' />
                    </div>
                    <div className='formItem'>
                        <input type="text" placeholder='Confirm Password' />
                    </div>
                    <div className='formItem'>
                        <button type='submit' className="button-22">Sign Up</button>
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