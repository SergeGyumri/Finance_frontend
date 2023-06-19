import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../store/actions/users";

function ResetPass(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errors, setErrors] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  let [searchParams] = useSearchParams();
  const token = searchParams.get('token')
  const handleResetPassword = (ev) => {
    ev.preventDefault();
    if (password !== repeatPassword) {
      setErrors('Passwords did not match')
    } else {
      dispatch(resetPassword({ password, token }, (err, data) => {
        if (err?.errors) {
          setErrors(err.errors.password || err.errors.message)
        } else if (data.status === 'ok') {
          navigate('/auth')
        }
      }))
    }

  }
  return (
    <div>
      <div className="wrapper-container">
        <div className="verify-block">
          <form className="verify-form" action="#">
            <h1 className="verify-form-title">
              Please enter your new password
            </h1>
            <div className="input-block">
              <input className="verify-input" autoComplete='true' type="password" placeholder='New password'
                     value={password}
                     onChange={(ev) => {
                       setPassword(ev.target.value)
                       setErrors('')
                     }
                     }/>
              <input className="verify-input" autoComplete='true' type="password" placeholder='Repeat password'
                     value={repeatPassword}
                     onChange={(ev) => {
                       setRepeatPassword(ev.target.value)
                       setErrors('')
                     }}/>
              {errors ? <p className='form-error-message'>{errors}</p> : null}
            </div>
            <div className="buttons-block">
              <button onClick={handleResetPassword} className="reg-form-button">Change password</button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}

export default ResetPass;
