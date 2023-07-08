import React, { useEffect } from 'react'
import "./LoginPage.css";
import loginPageImg from "../../assets/loginPageImg.png"
import LogoNoBg from "../../assets/LogoNoBg.png"
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from "../../formValidation/loginValidation"

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
            const res = await fetch("/verifyUser", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
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
            const { email, password } = values;
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json();
            if (res.status === 200) {
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
            <div className='loginPageContainer'>

                <div className='phoneImageContainer'>
                    <img src={loginPageImg} alt="Not available" />
                </div>

                <div className='loginFormContainer'>
                    <img src={LogoNoBg} alt="Logo not available" />
                    <form method='post' className='formStyling' onSubmit={handleSubmit}>
                        <div className='formItem'>
                            <input type="text" placeholder='Email' name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                            {errors.email && touched.email ? <h6>{errors.email}</h6> : null}
                        </div>
                        <div className='formItem'>
                            <input type="password" placeholder='Password' name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                            {errors.password && touched.password ? <h6>{errors.password}</h6> : null}
                        </div>
                        <div className='formItem'>
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