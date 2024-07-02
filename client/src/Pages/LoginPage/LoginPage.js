import React, { useEffect } from 'react'
import "./LoginPage.css";
import loginPageImg from "../../assets/loginPageImg.png"
import LogoNoBg from "../../assets/LogoNoBg.png"
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from "../../formValidation/loginValidation"
import Loading from "../../assets/Loading.gif"
import jscookie from "js-cookie";

const LoginPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        verifyUser();
        document.title = "Socity"
    }, []);

    const initialValues = { email: "", password: "" };
    const { values, errors, touched, resetForm, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            console.log(values);
            submitForm();
        }
    })

    const verifyUser = async () => {
        try {
            const sessionTkn = jscookie.get("sessionTkn");
            // const sessionTkn = document.cookie.split(";")[0].split("=")[1];
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/verifyUser`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ sessionTkn })
            });
            let data = await res.json();
            if (res.status === 200) {
                navigate("/user/feed");
            }
        } catch (err) {
            console.log(err);
            navigate("/");
        }
    }

    const submitForm = async () => {
        try {
            document.querySelector(".loadingContainer").style.display = "flex";
            const { email, password } = values;
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })
            const data = await res.json();
            document.querySelector(".loadingContainer").style.display = "none";
            if (res.status === 200) {
                const sessionTkn = data.sessionTkn;
                const expires = new Date(Date.now() + 86400000);
                document.cookie = `sessionTkn=${sessionTkn};path=/;expires=${expires}`
                window.alert(data.message);
                navigate("/user/feed");
            } else {
                window.alert(data.error);
                resetForm();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className='loadingContainer'>
                <img src={Loading} alt="" className='loading' />
            </div>
            <div className='loginPageContainer'>
                <div className='phoneImageContainer'>
                    <img src={loginPageImg} alt="Not available" />
                </div>
                <div className='loginFormContainer'>
                    <img src={LogoNoBg} alt="Logo not available" />


                    <form method='post' className='loginFormStyling' onSubmit={handleSubmit}>
                        <div className='loginFormItem'>
                            <input type="text" placeholder='Email' name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                            {errors.email && touched.email ? <h6>{errors.email}</h6> : null}
                        </div>
                        <div className='loginFormItem'>
                            <input type="password" placeholder='Password' name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                            {errors.password && touched.password ? <h6>{errors.password}</h6> : null}
                        </div>
                        <div className='loginFormItem'>
                            <button type='submit' className="button-22">Login</button>
                        </div>
                    </form>

                    <div className='signUp'>
                        Don't have an account? &nbsp; <Link to="/signup">Sign up</Link>
                    </div>

                </div >
            </div >
        </>
    )
}

export default LoginPage