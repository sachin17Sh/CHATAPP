import { useFormik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MUI_C } from "../MUI Components/Components"    
import { MUI_I } from "../MUI Components/Icons"
import "../assets/css/ConfirmPsw.css"

const initialValues = {
    NewPassword: '',
    ConfirmPassword: ''
}

const onSubmit = async (values, navigate, setErrorMessage) => {
    try {
        const email = sessionStorage.getItem("forgotEmail")
        const response = await fetch('http://localhost:8787/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                newPassword: values.NewPassword,
                confirmPassword: values.ConfirmPassword,
            })

        })
        if (response.ok) {
            alert("Password changes successfully..")
            navigate('/signin')
        } else {
            const data = await response.json()
            setErrorMessage(data.message || message.error || "Sorry! Unable to change the password...")
        }

    } catch (error) {
        setErrorMessage("An error occured while changing the password")
    }



}

export default function ConfirmPsw() {
    const [showNewpassword, setshowNewpassword] = useState(false)
    const [showConfirmPsw, setConfirmPsw] = useState(false)
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => onSubmit(values, navigate, setErrorMessage)
    })

    function handleNewPasswordToggle() {
        setshowNewpassword(prevState => !prevState)
    }
    function handleConfirmPasswordToggle() {
        setConfirmPsw(prevState => !prevState)
    }

    return (
        <>
            {errorMessage && <MUI_C.Alert className="error">{errorMessage}</MUI_C.Alert>}
            <form onSubmit={formik.handleSubmit} className="confirmPasswordSection">
                <h2>Set New Password</h2>

                <label htmlFor="NewPassword">New Password</label>
                <div className="password-container">
                    <input
                        id="NewPassword"
                        name="NewPassword"
                        placeholder="Enter New Password..."
                        type={showNewpassword ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        value={formik.values.NewPassword}
                        onBlur={formik.handleBlur}
                    />
                    <div className="password-toggle-icon" onClick={handleNewPasswordToggle}>
                        {showNewpassword ? (
                            <MUI_I.VisibilityOutlinedIcon className="visibility-icon" />
                        ) : (
                            <MUI_I.VisibilityOffOutlinedIcon className="visibility-icon" />
                        )}
                    </div>
                </div>

                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <div className="password-container">
                    <input
                        id="ConfirmPassword"
                        name="ConfirmPassword"
                        placeholder="Confirm Password..."
                        type={showConfirmPsw ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        value={formik.values.ConfirmPassword}
                        onBlur={formik.handleBlur}
                    />
                    <div className="password-toggle-icon" onClick={handleConfirmPasswordToggle}>
                        {showConfirmPsw ? (
                            <MUI_I.VisibilityOutlinedIcon className="visibility-icon" />
                        ) : (
                            <MUI_I.VisibilityOffOutlinedIcon className="visibility-icon" />
                        )}
                    </div>
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}
