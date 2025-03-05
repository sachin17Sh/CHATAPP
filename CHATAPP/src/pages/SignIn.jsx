import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/css/login.css";
import { MUI_I } from "../MUI Components/Icons";
import Modal from './modal/Modal';
import { MUI_C } from '../MUI Components/Components';

const initialValues = {
  username: '',
  password: ''
};

const onSubmit = async (values, navigate, setShowModal, setIsModalOpen, setErrorMessage) => {
  try {
    const response = await fetch('http://localhost:8787/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    });

    if (response.ok) {
      setIsModalOpen(true);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate('/home');
      }, 1000);

    } else {
      const data = await response.json()
      setErrorMessage(data.message || data.error|| "Unable to login." )
    }
  } catch (error) {
    setErrorMessage("Please enter valid credentials.")
  }
};

export default function SignIn() {
  const navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => onSubmit(values, navigate, setShowModal, setIsModalOpen, setErrorMessage)
  });

  function handlePasswordToggle() {
    setshowpassword(prevState => !prevState);
  }

  return (
    <>
      {showModal && <Modal open={isModalOpen}  
        title={`Welcome ${formik.values.username}`}>
       <h3>Success! You’re now logged in. Let’s get started...</h3>
      </Modal>}

      {
        errorMessage && <MUI_C.Alert >
          {errorMessage}
        </MUI_C.Alert>
      }

      <form onSubmit={formik.handleSubmit} className='Formsection'>
        <h2>Login</h2>
        <div>
          <label htmlFor='username'>User-Name</label>
          <input id='username'
            type='text'
            placeholder='Enter username'
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur} />
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
        <div className='link-section'>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        <p><Link to="/forgotPassword">Forgot Password?</Link></p>
        </div>
       
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </>
  );
}
