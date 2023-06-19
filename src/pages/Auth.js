import React, { useCallback, useState } from 'react';
import { useDispatch } from "react-redux";
import DatePicker from 'react-datepicker';
import Modal from "react-modal";
import moment from "moment";

import _ from 'lodash'
import { logIn, registerUser } from "../store/actions/users";
import WrapperLogOut from "../components/WrapperLogOut";
import { useNavigate } from "react-router-dom";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function App() {
  const dispatch = useDispatch();
  const [activeForm, setActiveForm] = useState(false);
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [registerFormDate, setRegisterFormDate] = useState({
    firstName: '',
    birthDate: '',
    lastName: '',
    password: '',
    email: '',
  })
  const [loginFormDate, setLoginFormDate] = useState({
    email: '',
    password: '',
  })

  const handleRegisterChange = useCallback((key, value) => {
    setErrors({})
    registerFormDate[key] = value;
    setRegisterFormDate({ ...registerFormDate });
  }, [registerFormDate, setRegisterFormDate]);

  const handleLoginChange = useCallback((key, value) => {
    setErrors({})
    loginFormDate[key] = value;
    setLoginFormDate({ ...loginFormDate });
  }, [loginFormDate, setLoginFormDate]);

  const handleRegister = (ev) => {
    ev.preventDefault();
    if (registerFormDate.password !== repeatPassword) {
      setErrors({
        password: 'passwords did not match'
      })
    } else {
      dispatch(registerUser({
        ...registerFormDate,
        birthDate: moment(registerFormDate.birthDate).format('DD-MM-YYYY')
      }, (err, data) => {
        if (err && err.errors) {
          setErrors(err.errors)
        } else if (data.status === 'ok') {
          setActiveForm(false);
          const form = {};
          _.mapKeys(registerFormDate, (value, key) => {
            form[key] = ''
          })
          setRegisterFormDate({ ...form })
          setRepeatPassword('')
        }
      }))
    }
  };

  const handleLogin = (ev) => {
    ev.preventDefault();
    setErrors({})
    dispatch(logIn(loginFormDate, (err, data) => {
      if (err.message === 'Not verified') {
        navigate('/verify')
      } else if (err && err.errors) {
        setErrors(err.errors)
      }

    }))

  };

  const [repeatPassword, setRepeatPassword] = useState('')
  return (
    <WrapperLogOut>
      <div className="wrapper-container">
        <div className={`container ${activeForm ? "right-panel-active" : ""}`} id="main">
          <div className="sign-up">
            <form className="reg-form" action="#">
              <h1 className="form-l-r-title">
                Create Account
              </h1>
              <p className="form-description">or sign in your account</p>
              <input className="reg-form-input" type="text" name="first Name" placeholder="First Name"
                     value={registerFormDate.firstName}
                     onChange={(ev) => handleRegisterChange('firstName', ev.target.value)}/>
              {errors.firstName ? <p className='form-error-message'>{errors.firstName}</p> : null}
              <input className="reg-form-input" type="text" name="last Name" placeholder="Last Name"
                     value={registerFormDate.lastName}
                     onChange={(ev) => handleRegisterChange('lastName', ev.target.value)}/>
              {errors.lastName ? <p className='form-error-message'>{errors.lastName}</p> : null}

              <input className="reg-form-input" type="email" name="email" placeholder="Email"
                     value={registerFormDate.email} onChange={(ev) => handleRegisterChange('email', ev.target.value)}/>
              {errors.email ? <p className='form-error-message'>{errors.email}</p> : null}

              <input autoComplete='true' className="reg-form-input" type="password" name="password"
                     placeholder="Password"

                     value={registerFormDate.password}
                     onChange={(ev) => handleRegisterChange('password', ev.target.value)}/>
              {errors.password ? <p className='form-error-message'>{errors.password}</p> : null}
              <input autoComplete='true' className="reg-form-input" type="password" name="repeat password"
                     placeholder="Repeat Password"
                     value={repeatPassword} onChange={(ev) => {
                setRepeatPassword(ev.target.value)
              }
              }/>
              <DatePicker
                wrapperClassName="datePicker"
                placeholderText="Birth date"
                selected={registerFormDate.birthDate}
                onChange={(data) => {
                  handleRegisterChange('birthDate', data)
                }}
                showYearDropdown
                dateFormat="dd-MM-yyyy"
                yearDropdownItemNumber={50}
                scrollableYearDropdown
              />
              {errors.birthDate ? <p className='form-error-message'>{errors.birthDate}</p> : null}

              <button onClick={handleRegister} className="reg-form-button">
                Sign Up
              </button>
            </form>
          </div>
          <div className="sign-in">
            <form className="reg-form" action="#">
              <h1 className="form-l-r-title">
                Sign In
              </h1>
              <p className="form-description">or use your email for registration</p>
              <input className="reg-form-input" type="email" name="email" placeholder="Email"
                     onChange={(ev) => handleLoginChange('email', ev.target.value)}/>

              <input autoComplete='true' className="reg-form-input" type="password" name="password"
                     placeholder="Password"
                     onChange={(ev) => handleLoginChange('password', ev.target.value)}
              />
              {errors.login ? <p className="form-error-message">{errors.login}</p> : null}
              <a className="form-link" href="/forgot-pass">Forget Password ?</a>
              <button className="reg-form-button" onClick={handleLogin}>
                Sign In
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please log in with your personal info</p>
                <button onClick={() => setActiveForm(false)} className="reg-form-button overlay-button" id="signIn">Sign
                  In
                </button>
              </div>
              <div className="overlay-right">
                <h1>Hello, Friend</h1>
                <p>Enter your personal details and start journey with us</p>
                <button onClick={() => setActiveForm(true)} className="reg-form-button overlay-button" id="signUp">Sign
                  Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WrapperLogOut>
  );
}

export default App;
