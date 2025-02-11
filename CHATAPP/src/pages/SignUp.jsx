import React, { useState } from 'react'
import { useFormik } from 'formik'
import "../assets/css/SignUp.css"
import { Link, useNavigate } from "react-router-dom"
import useValidation from '../hooks/Validation'
import { MUI_I } from "../MUI Components/Icons"
import Modal from './modal/Modal'
import { MUI_C } from '../MUI Components/Components'

const validate = useValidation()
const initialValues = {
  name: '',
  userName: '',
  email: '',
  password: ''
}

const onSubmit = async (values, navigate, setShowModal, setIsModalOpen, setErrorMessage) => {
    try {
      const response = await fetch('http://localhost:8787/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });
  
      // console.log(response.status);
  
      const data = await response.json().catch(() => null); // this help if the response is empty it will set it to null 
  
      if (response.ok) {
        setIsModalOpen(true);
        setShowModal(true);
  
        setTimeout(() => {
          setShowModal(false);
          navigate('/signin');
        }, 1000);
      } else {
        setErrorMessage(data.message || "Unable to register.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Unable to sign up.");
    }
  };
  
  

function SignUp() {
  const navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const formik = useFormik({
    initialValues,
    onSubmit: (values) => onSubmit(values, navigate, setShowModal, setIsModalOpen, setErrorMessage),
    validate
  })

  function handlePasswordToggle() {
    setshowpassword(prevState => !prevState)
  }

  return (
    <>


      {showModal && <Modal open={isModalOpen}
        title={`Welcome ${formik.values.userName}`}>
        <h3>Success! You Signed in Successfully...</h3>
      </Modal>}

      {
        errorMessage && <MUI_C.Alert >
          {errorMessage}
        </MUI_C.Alert>
      }
      <form onSubmit={formik.handleSubmit} className='FormSection'>
        <h2>Sign Up</h2>
        <div>
          <label htmlFor='name'>Name</label>
          <input id='name'
            type='text'
            placeholder='Enter your Name...'
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur} />
          {formik.touched.name && formik.errors.name ? (<div className='errors'>{formik.errors.name}</div>) : null}
        </div>
        <div>
          <label htmlFor='userName'>User-Name</label>
          <input id='userName'
            type='text'
            placeholder='Enter username'
            onChange={formik.handleChange}
            value={formik.values.userName}
            onBlur={formik.handleBlur} />
          {formik.touched.userName && formik.errors.userName ? (<div className='errors'> {formik.errors.userName}</div>) : null}
        </div>
        <div>
          <label htmlFor='email'>E-Mail Address</label>
          <input id='email'
            type='email'
            placeholder='Enter your Email Address'
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur} />
          {formik.touched.email && formik.errors.email ? (<div className='errors'>{formik.errors.email}</div>) : null}
        </div>
        <div className="password-wrapper">
        <label htmlFor='password'>Password</label>
          <input
            id="password"
            name="password"
            type={showpassword ? 'text' : 'password'}
            placeholder='Enter your Password...'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {showpassword ? (
            <MUI_I.VisibilityOutlinedIcon
              className="visibility-icon"
              onClick={handlePasswordToggle}
            />
          ) : (
            <MUI_I.VisibilityOffOutlinedIcon
              className="visibility-icon"
              onClick={handlePasswordToggle}
            />
          )}
        </div>
        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </>
  )
}

export default SignUp
