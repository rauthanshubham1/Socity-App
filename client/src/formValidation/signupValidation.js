import * as Yup from "yup";

export const signupSchema = Yup.object({
    name: Yup.string().min(2).max(30).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    phone: Yup.string().min(10).required("Please enter your phone number"),
    password: Yup.string().min(4).required("Please enter your password"),
    cPassword: Yup.string().required().oneOf([Yup.ref("password"), null], "Password must match"),
})