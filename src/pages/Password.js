import React, { useCallback, useState } from 'react';
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';

import { changePass } from "../store/actions/users";
import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg"
import { ReactComponent as HomeIcon } from "../assets/icons/vector.svg"
import Wrapper from "../components/Wrapper";

const initialState = {
  oldPass: '',
  newPass: '',
  repeatPass: '',
}
function Password(props) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [userForm, setUserForm] = useState({
    oldPass: '',
    newPass: '',
    repeatPass: '',
  })

  const handleUpdate = (ev) => {
    ev.preventDefault()
    if (userForm.newPass !== userForm.repeatPass) {
      setErrors({
        repeatPass: 'The new password and repeat password do not match'
      })
    } else {
      delete userForm['repeatPass'];
      dispatch(changePass(userForm, (err, data) => {
        if (err?.errors) {
          setErrors(err.errors)
        }
        if (data) {
          setUserForm({ ...initialState })
        }
      }))
    }
  }

  const handleChange = useCallback((key, value) => {
    setErrors({})
    userForm[key] = value
    setUserForm({ ...userForm })
  }, [userForm, setUserForm])

  return (
    <Wrapper>
      <div className="home-container">
        <div className="home-menu">
          <NavLink to={'/history'}
                   className={({ isActive }) => (isActive ? "home-nav-link active-nav" : 'home-nav-link')}>
            <HomeIcon className={'home-icon'}/>
          </NavLink>
          <NavLink to={'/settings'}
                   className={({ isActive }) => (isActive ? "home-nav-link active-nav" : 'home-nav-link')}>
            <SettingsIcon className={'settings-icon'}/>
          </NavLink>
        </div>
        <div className="home-right-block">
          <div className="home-right-block-nav-bar">
            <ul className="home-right-block-nav">
              <li className={'home-right-block-navbar'}>
                <NavLink to={'/settings/account'}
                         className={({ isActive }) => (isActive ? "home-right-block-nav-link active" : 'home-right-block-nav-link')}>
                  <h3 className="home-block-title">
                    Account
                  </h3>
                  <div className="test"></div>
                </NavLink>
              </li>
              <li className={'home-right-block-navbar'}>
                <NavLink to={'/settings/password'}
                         className={({ isActive }) => (isActive ? "home-right-block-nav-link active" : 'home-right-block-nav-link')}>
                  <h3 className="home-block-title">
                    Password
                  </h3>
                  <div className="test"></div>
                </NavLink>
              </li>
            </ul>
          </div>
          <form className={'update-user-form'}>
            <input className={'modal-form-input'} type="password" placeholder={'old password'} value={userForm.oldPass}
                   onChange={(ev) => handleChange('oldPass', ev.target.value)}/>
            {errors.oldPass ? <p className={'form-error-message'}>{errors.oldPass}</p> : null}
            <input className={'modal-form-input'} type="password" placeholder={'new password'} value={userForm.newPass}
                   onChange={(ev) => handleChange('newPass', ev.target.value)}/>
            {errors.newPass ? <p className={'form-error-message'}>{errors.newPass}</p> : null}
            <input className={'modal-form-input'} type="password" placeholder={'repeat password'}
                   value={userForm.repeatPass}
                   onChange={(ev) => handleChange('repeatPass', ev.target.value)}/>
            {errors.repeatPass ? <p className={'form-error-message'}>{errors.repeatPass}</p> : null}
            <button className={'update-user-form-button'} type={'submit'} onClick={handleUpdate}>update</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

export default Password;
