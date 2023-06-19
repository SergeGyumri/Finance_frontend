import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DatePicker from 'react-datepicker'
import { useDispatch, useSelector } from "react-redux";
import { acceptIncome, getMyAccount, getNotifications, rejectIncome, seenNotification } from "../store/actions/users";
import { ReactComponent as NotificationIcon } from "../assets/icons/notification.svg"
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg"
import { ReactComponent as LogoIcon } from "../assets/icons/logo.svg"
import querystring from 'querystring';
import Token from "../services/Token";
import Modal from "react-modal";
import moment from "moment";
import _ from 'lodash'
import { getHistory } from "../store/actions/balance";

const customStyles = {
  content: {
    position: 'absolute',
    width: '500px',
    top: '100px',
    left: 'calc(100% - 600px)',
    bottom: '200px',
    border: '1px solid #007a7e',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '15px',
    outline: 'none',
    padding: '20px'
  }
};

function Header(props) {
  const dispatch = useDispatch();
  const account = useSelector(store => store.users.account)
  const notifications = useSelector(store => store.users.notifications)
  const [searchParams, setSearchParams] = useSearchParams()
  const [notificationIsOpen, setNotificationIsOpen] = useState(false)
  const navigate = useNavigate();
  const formData = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch(getMyAccount())
  }, [])
  const handleFormChange = (inputName, data) => {
    const form = {
      ...formData,
      [inputName]: data
    }
    setSearchParams(form)
  }

  const handleCloseModal = () => {
    setNotificationIsOpen(false)
  }
  const handleSearch = () => {
    navigate({
      pathname: '/history',
      search: `?${querystring.stringify(formData, '&', '=')}`,
    });
    dispatch(getHistory(formData))
  }
  const handleLogOut = (ev) => {
    ev.preventDefault()
    Token.delete()
    navigate('/auth')
  }
  const handleOpenNotifications = () => {
    setNotificationIsOpen(true)
    dispatch(getNotifications({}, (err, data) => {
      if (data) {
        dispatch(seenNotification())
      }
    }))
  }

  const handleAccept = (income) => {
    dispatch(acceptIncome(income.id))
  }
  const handleReject = (income) => {
    dispatch(rejectIncome(income.id))
  }

  return (
    <div className={'header'}>
      <Link to={'/history'} className={'logo-block'}>
        <LogoIcon className={'logo'}/>
      </Link>
      <div className="search-block">
        <input placeholder={'Search'} className={'search-input'}
               onChange={(ev) => handleFormChange('s', ev.target.value)} value={formData?.s}/>
        <div className={'vector'} onClick={handleSearch}>
          <SearchIcon/>
        </div>
      </div>
      <div className="dateForm">
        <DatePicker
          wrapperClassName="header-date-picker"
          placeholderText="Start date"
          selected={moment(formData.startDate, 'YYYY-MM-DD').isValid() ? moment(formData.startDate, 'YYYY-MM-DD').toDate() : null}
          onChange={(data) => {
            handleFormChange('startDate', moment(data).isValid() ? moment(data).format('YYYY-MM-DD') : '')
          }}
          showYearDropdown
          dateFormat="dd-MM-yyyy"
          yearDropdownItemNumber={50}
          scrollableYearDropdown
        />
        <DatePicker
          wrapperClassName="header-date-picker"
          placeholderText="End date"
          selected={moment(formData.endDate, 'YYYY-MM-DD').isValid() ? moment(formData.endDate, 'YYYY-MM-DD').toDate() : null}
          onChange={(data) => {
            handleFormChange('endDate', moment(data).isValid() ? moment(data).format('YYYY-MM-DD') : '')
          }}
          showYearDropdown
          dateFormat="dd-MM-yyyy"
          yearDropdownItemNumber={50}
          scrollableYearDropdown
        />
      </div>
      <div className="notification">
        {account.notificationCount > 0 ? <p className={'notification-count'}>{account.notificationCount}</p> : null}
        <NotificationIcon className={'notification-icon'} onClick={handleOpenNotifications}/>
        <Modal
          isOpen={notificationIsOpen}
          style={customStyles}
          onRequestClose={handleCloseModal}
          contentLabel="Example Modal"
        >
          {notifications && notifications.length ?
            notifications.map(({ income }) => (
              <div className={'notification-item'} key={income.id}>
                <div className="notification-description">{income.description || 'none description'}</div>
                <div style={{ color: income.type === 'up' ? 'green ' : 'red' }}
                     className="notification-price">{income.type === 'up' ? '+ ' : '- '}{income.price}</div>
                <div className="notifications-buttons">
                  {+income.status === 2 ?
                    <>
                      <button style={{ background: "green" }} onClick={() => handleAccept(income)}
                              className={'notifications-buttons-item'}>accept
                      </button>
                      <button style={{ background: "red" }} onClick={() => handleReject(income)}
                              className={'notifications-buttons-item'}>reject
                      </button>
                    </>
                    : <p style={{ color: income.status === 1 ? 'green' : income.status === 0 ? 'red' : '' }}
                         className={'notification-item-status'}>{income.status === 1 ? 'accepted' : income.status === 0 ? 'rejected' : ''}</p>
                  }
                </div>
                <div className="notification-date">{moment(income.createdAt).local().format('MMM DD')}</div>
              </div>))
            : <p>no results</p>}
          <div className="modal-buttons">
            <button className={'close-modal'} onClick={handleCloseModal}>CLOSE</button>
          </div>
        </Modal>
      </div>
      <div className="user-info">
        <Link className={'user-info-name'} to={'/settings'}>{account.firstName} {account.lastName}</Link>
      </div>
      <button className={'log-out-button'} onClick={handleLogOut}>LOG OUT</button>
    </div>
  );
}

export default Header;
