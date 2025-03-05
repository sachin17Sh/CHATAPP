import { useFormik } from 'formik';
import { MUI_C } from '../MUI Components/Components';
import "../assets/css/OTP.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  otp1: '',
  otp2: '',
  otp3: '',
  otp4: '',
  otp5: '',
  otp6: '',
};

const onSubmit = async (values, setErrorMessage, navigate) => {
  try {
    let email = sessionStorage.getItem("forgotEmail");
    const otp = Object.values(values).join('');  // Join OTP fields into a single string

    const response = await fetch('http://localhost:8787/verify-otp', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ otp, email })
    });

    if (response.ok) {
      navigate('/confirmpassword');
    } else {
      const data = await response.json();
      setErrorMessage(data.message || data.error || "OTP mismatched");
    }

  } catch (error) {
    setErrorMessage("An error occurred");
  }
};

export default function OtpForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => onSubmit(values, setErrorMessage, navigate),
    validate: (values) => {
      const errors = {};
      Object.keys(values).forEach((key) => {
        if (!values[key]) {
          errors[key] = 'OTP is required';
        }
      });
      return errors;
    }
  });

  const handleOtpChange = (e, fieldName) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      formik.setFieldValue(fieldName, value);
      if (value !== '' && fieldName !== 'otp6') {
        const nextField = document.getElementById(`otp-${parseInt(fieldName.slice(-1)) + 1}`);
        nextField && nextField.focus();
      }
    }
  };

  return (
    <>
      {errorMessage && <MUI_C.Alert>{errorMessage}</MUI_C.Alert>}

      <form onSubmit={formik.handleSubmit} className="OtpFormSection">
        <h1>Enter OTP</h1>

        <div className="otp-inputs">
          {['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'].map((otpField, index) => (
            <input
              key={otpField}
              id={`otp-${index + 1}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={formik.values[otpField]}
              onChange={(e) => handleOtpChange(e, otpField)}
              onBlur={formik.handleBlur}
              className={formik.errors[otpField] && formik.touched[otpField] ? 'error' : ''}
            />
          ))}
        </div>
        <div>
          <button type="submit">
            Verify OTP
          </button>
        </div>
      </form>
    </>
  );
}