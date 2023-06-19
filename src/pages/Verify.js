import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { resendVerifyCode, verifyAccount } from "../store/actions/users";
import { Navigate } from "react-router-dom";

function Verify(props) {
  const dispatch = useDispatch()
  const [verifyCode, setVerifyCode] = useState('')
  const verifyEmail = useSelector(store => store.users.verifyEmail)
  const [errors, setErrors] = useState('')
  const [sent, setSent] = useState(false)
  const token = useSelector(store => store.users.token);

  if (token) {
    return <Navigate to="/history" replace/>
  }
  if (!verifyEmail) {
    return <Navigate to="/auth" replace/>
  }

  const handleVerify = (ev) => {
    ev.preventDefault()
    if (verifyCode.length === 6) {
      dispatch(verifyAccount({ email: verifyEmail, verifyCode }, (err, data) => {
        if (err?.errors) {
          setErrors(err.errors.message)
        } else if (data){
          console.log(data)
        }
      }))
    } else {
      setErrors('uncorrected verifyCode')
    }
  }
  const resendCode = (ev) => {
    ev.preventDefault()
    dispatch(resendVerifyCode(verifyEmail, (err, data) => {
      if (err?.errors){
        setErrors(err.errors.message)
      }else if (data){
        setSent(true);
      }
    }));
  }
  return (
    <div>
      <div className="wrapper-container">
        <div className="verify-block">
          <form className="verify-form" action="#">
            <h1 className="verify-form-title">
              {sent ? "Verification code already sent to your email, please check your email" : `We have sent the verification code to your email, please check your email for verification, ${verifyEmail}`}
            </h1>
            <div className="input-block">
              <input className="verify-input" type="text" maxLength={6} minLength={6} placeholder='verify code'
                     value={verifyCode}
                     onChange={(ev) => setVerifyCode(ev.target.value)}/>
              {errors ? <p className='form-error-message'>{errors}</p> : null}
            </div>
            <div className="buttons-block">
              <button onClick={handleVerify} className="reg-form-button">Verify</button>
              <button onClick={resendCode} className="reg-form-button">Resend</button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}

export default Verify;
