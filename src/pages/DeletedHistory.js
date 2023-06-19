import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from 'react-router-dom';
import Modal from 'react-modal';
import moment from "moment";

import { getBalance, getDeletedList, resumeIncome } from "../store/actions/balance";
import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg"
import { ReactComponent as HomeIcon } from "../assets/icons/vector.svg"
import Wrapper from "../components/Wrapper";
import Pagination from "../components/Pagination";
import Balance from "../components/Balance";


Modal.setAppElement('#root');

function DeletedHistory(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams()
  const formData = Object.fromEntries([...searchParams]);
  const balance = useSelector(store => store.balance.balance)
  const deletedHistory = useSelector(store => store.balance.deletedHistory)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBalance());
    dispatch(getDeletedList(formData, (err, data) => {
      if (data) {
        setCurrentPage(data._meta.currentPage);
        setPageCount(data._meta.pageCount);
      }
    }));
  }, [])


  useEffect(() => {
    dispatch(getDeletedList(formData, (err, data) => {
      setCurrentPage(data._meta.currentPage);
      setPageCount(data._meta.pageCount);
    }));
  }, [formData.page])


  const handleResumeIncome = (income) => {
    dispatch(resumeIncome(income.id))
  }

  const onPageChange = (page) => {
    setSearchParams({
      page,
    })
  }

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
                <NavLink to={'/history'}
                         className={({ isActive }) => (isActive ? "home-right-block-nav-link active" : 'home-right-block-nav-link')}>
                  <h3 className="home-block-title">
                    History
                  </h3>
                  <div className="test"></div>
                </NavLink>
              </li>
              <li className={'home-right-block-navbar'}>
                <NavLink to={'/repeat'}
                         className={({ isActive }) => (isActive ? "home-right-block-nav-link active" : 'home-right-block-nav-link')}>
                  <h3 className="home-block-title">
                    Repeat Transactions
                  </h3>
                  <div className="test"></div>
                </NavLink>
              </li>
              <li className={'home-right-block-navbar'}>
                <NavLink to={'/deleted'}
                         className={({ isActive }) => (isActive ? "home-right-block-nav-link active" : 'home-right-block-nav-link')}>
                  <h3 className="home-block-title">
                    Deleted Transactions
                  </h3>
                  <div className="test"></div>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={'balance-block'}>
            <Balance balance={balance.balance} income={balance.income} spending={balance.spending} />
          </div>
          <div className={'history-block'}>
            <div className={'history-titles'}>
              <p className={'history-titles-description'}>Description</p>
              <p className={'history-titles-created'}>created in date</p>
              <p className={'history-titles-price'}>Price</p>
            </div>
            {deletedHistory ? deletedHistory.map((balance) => (
              <div className={'history-item'} key={balance.id}>
                <p className={'history-item-description'}>{balance.description || 'none description'}</p>
                <p className={'history-item-createdAt'}>{moment.utc(balance.createdAt).local().format('DD-MM-YYYY')}</p>
                <button style={{ background: "green" }} onClick={() => handleResumeIncome(balance)}
                        className={'notifications-buttons-item'}>Resume
                </button>
                <p className={'history-item-price'}
                   style={{ color: balance.type === 'up' ? 'green' : 'red' }}>{balance.type === 'up' ? '+ ' : '- '}{balance.price}</p>
              </div>)) : null}
          </div>
          <Pagination totalPages={pageCount} page={currentPage} pageChange={(page) => onPageChange(page)}/>
        </div>
      </div>
    </Wrapper>
  );
}

export default DeletedHistory;
