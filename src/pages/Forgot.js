import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { forgotPass } from "../store/actions/users";
import { useNavigate } from "react-router-dom";

function Forgot(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');
  const [sent, setSent] = useState(false);
  const handleSend = (ev) => {
    ev.preventDefault()
    dispatch(forgotPass({ email }, (err, data) => {
      if (err?.errors) {
        setErrors(err.errors.message || err.errors.email)
      } else if (data) {
        setSent(true)
      }
    }))
  }
  const resendCode = (ev) => {
    ev.preventDefault()
    setEmail('')
    setSent(false)
  }
  const handleGoToLogin = (ev) => {
    ev.preventDefault()
    navigate('/auth')
  }
  return (
    <div>
      <div className="wrapper-container">
        <div className="verify-block">
          <form className="verify-form">
            <h1 className="verify-form-title">
              {sent ? "Please check your email" : "Please enter your email to reset password"}
            </h1>
            <div className="input-block">
              {!sent ?
                <input className="verify-input" type="email" placeholder='Email' value={email}
                       onChange={(ev) => {
                         setEmail(ev.target.value)
                         setErrors('')
                       }}/> : null}
              {errors ? <p className='form-error-message'>{errors}</p> : null}
            </div>
            <div className="buttons-block">
              {sent ? <button onClick={resendCode} className="reg-form-button">Resend</button> :
                <button onClick={handleSend} className="reg-form-button">Send</button>}
              <button onClick={handleGoToLogin} className="reg-form-button">Log in</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
