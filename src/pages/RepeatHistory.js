import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import Modal from 'react-modal';
import moment from "moment";

import {
  deleteIncome,
  deleteRepeatedIncome,
  getBalance, getDeletedList,
  getRepeatList,
  updateIncome,
  updateRepeatedIncome
} from "../store/actions/balance";
import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg"
import { ReactComponent as DeleteIcon } from "../assets/icons/delete.svg"
import { ReactComponent as HomeIcon } from "../assets/icons/vector.svg"
import Wrapper from "../components/Wrapper";
import Pagination from "../components/Pagination";
import Balance from "../components/Balance";

const customStyles = {
  content: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    margin: 'auto',
    border: '1px solid #007a7e',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '15px',
    outline: 'none',
    padding: '20px'
  }
};

Modal.setAppElement('#root');

const initialState = {
  repeatDateType: '',
  repeatDayCount: 0,
  description: '',
  repeat: false,
  price: '',
  type: ''
}

function RepeatHistory(props) {
  const balance = useSelector(store => store.balance.balance)
  const repeatHistory = useSelector(store => store.balance.repeatHistory)
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams()
  const formData = Object.fromEntries([...searchParams]);
  const [itemIsOpen, setItemIsOpen] = React.useState(false);
  const [errors, setErrors] = useState({})
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [openItem, setOpenItem] = React.useState({
    repeatDateType: '',
    repeatDayCount: 0,
    description: '',
    price: '',
    type: ''
  });

  const repeatDateTypes = [
    { value: 'day', label: 'day' },
    { value: 'every week', label: 'week' },
    { value: 'every month', label: 'month' },
  ];
  const priceType = [
    { value: 'up', label: 'up' },
    { value: 'down', label: 'down' },
  ];

  useEffect(() => {
    dispatch(getBalance());
    dispatch(getRepeatList(formData, (err, data) => {
      if (data) {
        setCurrentPage(data._meta.currentPage);
        setPageCount(data._meta.pageCount);
      }
    }));
  }, [])

  useEffect(() => {
    dispatch(getRepeatList(formData, (err, data) => {
      setCurrentPage(data._meta.currentPage);
      setPageCount(data._meta.pageCount);
    }));
  }, [formData.page])
  const onPageChange = (page) => {
    setSearchParams({
      page,
    })
  }

  const handleCloseModal = () => {
    setItemIsOpen(false)
  }

  const handleUpdateIncome = () => {
    dispatch(updateRepeatedIncome({
      repeatDateType: openItem.repeatDateType,
      repeatDayCount: openItem.repeatDayCount,
      description: openItem.description,
      type: openItem.type,
      price: openItem.price,
      incomeId: openItem.id,
    }, (err, data) => {
      if (err && err.status === 'error') {
        setErrors(err.errors)
      } else if (data && data.status === 'ok') {
        setOpenItem({ ...initialState });
        setItemIsOpen(false)
      }
    }))
  }

  const handleChangeItem = useCallback((key, value) => {
    setErrors({})
    openItem[key] = value;
    setOpenItem({ ...openItem });
  }, [openItem, setOpenItem]);

  const handleChooseItem = (item) => {
    setOpenItem(item)
    setItemIsOpen(true)
  }
  const handleDeleteItem = () => {
    dispatch(deleteRepeatedIncome(openItem.id))
    setOpenItem({ ...initialState })
    setItemIsOpen(false)
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
              <p className={'history-titles-created'}>Next date</p>
              <p className={'history-titles-price'}>Price</p>
            </div>
            {repeatHistory ? repeatHistory.map((balance) => (
              <div className={'history-item'} key={balance.id} onClick={() => handleChooseItem(balance)}>
                <p className={'history-item-description'}>{balance.description || 'none description'}</p>
                <p
                  className={'history-item-createdAt'}>{moment.utc(balance.nextDate || balance.otherDate).local().format('DD-MM-YYYY')}</p>
                <p className={'history-item-price'}
                   style={{ color: balance.type === 'up' ? 'green' : 'red' }}>{balance.type === 'up' ? '+ ' : '- '}{balance.price}</p>
              </div>)) : null}
            <div className={'modal'}>
              <Modal
                isOpen={itemIsOpen}
                style={customStyles}
                onRequestClose={handleCloseModal}
                contentLabel="Example Modal"
              >
                <h3 className={'modal-title'}>YOUR INCOME</h3>
                <form className={'modal-form'}>
                  <input className={'modal-form-input'} placeholder={'Price'} type={'number'} value={openItem.price}
                         onChange={(ev) => handleChangeItem('price', ev.target.value)}/>
                  {errors.price ? <p className={'form-error-message'}>{errors.price}</p> : null}
                  <Select
                    className='modal-select'
                    placeholder='Choose price type'
                    value={priceType.find(i => i.label === openItem.type)}
                    onChange={v => handleChangeItem('type', v.label)}
                    options={priceType}
                    getOptionValue={item => item.value}
                    getOptionLabel={item => item.label}
                  />
                  <input className={'modal-form-input'} placeholder={'Description'} value={openItem.description}
                         onChange={(ev) => handleChangeItem('description', ev.target.value)}/>
                  <Select
                    className='modal-select'
                    placeholder='Choose repeat date type'
                    value={repeatDateTypes.find(i => i.label === openItem.repeatDateType)}
                    onChange={v => handleChangeItem('repeatDateType', v.label)}
                    options={repeatDateTypes}
                    getOptionValue={item => item.value}
                    getOptionLabel={item => item.label}
                  />
                  {(openItem.repeatDateType === 'day') ?
                    <input value={openItem.repeatDayCount || ''}
                           onChange={(ev) => handleChangeItem('repeatDayCount', ev.target.value)} type={'number'}
                           className={'modal-form-input'} placeholder={'Repeat days count'}/> : null}
                  {errors.repeatDayCount ? <p className={'form-error-message'}>{errors.repeatDayCount}</p> : null}
                </form>
                <div className="modal-buttons">
                  <button className={'modal-form-button'} onClick={handleUpdateIncome}>UPDATE</button>
                  <div className="history-item-delete-icon">
                    <DeleteIcon className={'delete-icon'} onClick={handleDeleteItem}/>
                  </div>
                  <button className={'close-modal'} onClick={handleCloseModal}>CLOSE</button>
                </div>
              </Modal>
            </div>
          </div>
          <Pagination totalPages={pageCount} page={currentPage} pageChange={(page) => onPageChange(page)}/>
        </div>
      </div>
    </Wrapper>
  );
}

export default RepeatHistory;
