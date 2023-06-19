import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker'

import Wrapper from "../components/Wrapper";
import { updateUser } from "../store/actions/users";
import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg"
import { ReactComponent as HomeIcon } from "../assets/icons/vector.svg"
import moment from "moment";


function Account(props) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const account = useSelector(store => store.users.account);
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
  })

  useEffect(() => {
    setUserForm({
      firstName: account.firstName,
      lastName: account.lastName,
      birthDate: account.birthDate,
    })
  }, [account])
  const handleUpdate = (ev) => {
    ev.preventDefault()
    dispatch(updateUser({
      ...userForm,
      birthDate: moment(userForm.birthDate, 'YYYY-MM-DD').format('DD-MM-YYYY')
    }, (err, data) => {
      if (err?.errors) {
        setErrors(err.errors)
      }
      if (data) {

      }
    }))
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
          {userForm ?
            <form className={'update-user-form'}>
              <input className={'modal-form-input'} type="text" placeholder={'first name'} value={userForm.firstName}
                     onChange={(ev) => handleChange('firstName', ev.target.value)}/>
              <p className={'form-error-message'}>{errors?.firstName}</p>
              <input className={'modal-form-input'} type="text" placeholder={'last name'} value={userForm.lastName}
                     onChange={(ev) => handleChange('lastName', ev.target.value)}/>
              <p className={'form-error-message'}>{errors?.lastName}</p>
              <DatePicker
                wrapperClassName="datePicker"
                placeholderText="Birth date"
                selected={moment(userForm.birthDate, 'YYYY-MM-DD').isValid() ? moment(userForm.birthDate, 'YYYY-MM-DD').toDate() : null}
                onChange={(data) => {
                  handleChange('birthDate', moment(data).format('YYYY-MM-DD'))
                }}
                showYearDropdown
                dateFormat="dd-MM-yyyy"
                yearDropdownItemNumber={50}
                scrollableYearDropdown
              />
              <p className={'form-error-message'}>{errors?.birthDate}</p>
              <button className={'update-user-form-button'} type={'submit'} onClick={handleUpdate}>update</button>
            </form> : null}
        </div>
      </div>
    </Wrapper>
  );
}

export default Account;
