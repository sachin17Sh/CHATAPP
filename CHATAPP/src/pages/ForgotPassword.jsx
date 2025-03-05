import { useFormik } from 'formik';
import { MUI_C } from '../MUI Components/Components';
import "../assets/css/ForgotPassword.css"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const initialValues = {
    email: ''
}
const onSubmit = async (values,  setErrorMessage, navigate) => {
    try {
        debugger
        sessionStorage.setItem("forgotEmail", values.email )
        const response = await fetch(`http://localhost:8787/forget-password?email=${values.email}`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({})
        })
        if (response.ok) {
            navigate('/otp')
        }  else {
                const data = await response.json()
                setErrorMessage(data.message || data.error|| "Check your email." )
              }

    } catch (error) {
        setErrorMessage("Unable to send OTP.")
    }
}


export default function ForgotPassword() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => onSubmit(values, setErrorMessage, navigate)
    })


    return (
        <>
            {
              errorMessage && <MUI_C.Alert >
                    {errorMessage}
             </MUI_C.Alert>
            }
            <form onSubmit={formik.handleSubmit} className='ForgotFormsection'>
                <h1>Forgot Password</h1>
                <div>
                    <label htmlFor='email'>E-Mail</label>
                    <input id='email'
                        type='email'
                        placeholder='Enter your Email Address...'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur} />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </>
    )
}
