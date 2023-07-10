import React, { useEffect } from 'react'
import "./SignupPage.css"
import LogoNoBg from "../../assets/LogoNoBg.png"
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { signupSchema } from "../../formValidation/signupValidation"

const SignupPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        verifyUser();
        document.title = "Socity"
    }, []);

    const initialValues = { name: "", email: "", phone: "", password: "", cPassword: "" };
    let { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik(
        {
            initialValues: initialValues,
            validationSchema: signupSchema,
            onSubmit: (values) => {
                console.log(values);
                submitForm();
            }
        })

    const verifyUser = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/verifyUser`, {
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
            navigate("/signup");
        }
    }

    const submitForm = async () => {
        try {
            const { name, email, phone, password } = values;
            const res = await fetch(`${process.env.REACT_APP_ROUTE}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, phone, password })
            })
            const data = await res.json();
            if (res.status === 201) {
                window.alert(data.message);
                navigate("/")
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
            <div className='signupFormContainer'>
                <img src={LogoNoBg} alt="Logo not available" />

                <form method='post' className='formStyling' onSubmit={handleSubmit}>
                    <div className='formItem'>
                        <input type="text" placeholder='Name' name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                        {errors.name && touched.name ? (<h6 >{errors.name}</h6>) : null}
                    </div>
                    <div className='formItem'>
                        <input type="text" placeholder='Email' name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                        {errors.email && touched.email ? (<h6 >{errors.email}</h6>) : null}
                    </div>
                    <div className='formItem'>
                        <input type="text" placeholder='Phone' name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                        {errors.phone && touched.phone ? (<h6 >{errors.phone}</h6>) : null}
                    </div>
                    <div className='formItem'>
                        <input type="password" placeholder='Password' name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                        {errors.password && touched.password ? (<h6 >{errors.password}</h6>) : null}
                    </div>
                    <div className='formItem'>
                        <input type="text" placeholder='Confirm Password' name='cPassword' value={values.cPassword} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                        {errors.cPassword && touched.cPassword ? (<h6 >{errors.cPassword}</h6>) : null}
                    </div>
                    <div className='formItem'>
                        <button type='submit' className="button-22" >Sign Up</button>
                    </div>
                </form >

                < div className='logIn' >
                    Have an account ?  &nbsp; <a href="/">Login</a>
                </ div>

            </div >
        </>
    )
}

export default SignupPage