import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import Modal from 'react-modal';
import moment from "moment";
import _ from 'lodash';

import { deleteIncome, downloadXlsx, getBalance, getHistory, newIncome, updateIncome } from "../store/actions/balance";
import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";
import { ReactComponent as OpenModal } from "../assets/icons/open-modal.svg";
import { ReactComponent as DeleteIcon } from "../assets/icons/delete.svg";
import { ReactComponent as HomeIcon } from "../assets/icons/vector.svg";
import Pagination from "../components/Pagination";
import Wrapper from "../components/Wrapper";
import DatePicker from "react-datepicker";
import Balance from "../components/Balance";

const customStyles = {
  content: {
    position: 'absolute',
    width: '600px',
    // height: '600px',
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

const repeatDateTypes = [
  { value: 'day', label: 'day' },
  { value: 'week', label: 'every week' },
  { value: 'month', label: 'every month' },
];

const priceType = [
  { value: 'up', label: 'Income' },
  { value: 'down', label: 'Spending' },
];
const weekDays = [
  { value: 7, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];


const initialState = {
  repeatDateType: '',
  repeatDayCount: 0,
  description: '',
  repeat: false,
  price: '',
  type: '',
  weekDay: moment().day(),
  date: moment().format('YYYY-MM-DD')
}

function History(props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const balance = useSelector(store => store.balance.balance)
  const balanceHistory = useSelector(store => store.balance.balanceHistory)
  const account = useSelector(store => store.users.account)
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [itemIsOpen, setItemIsOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [openItem, setOpenItem] = React.useState({});
  const [errors, setErrors] = useState({})
  const formData = Object.fromEntries([...searchParams]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [downloadModal, setDownloadModal] = useState(false);
  const [downloadModalForm, setDownloadModalForm] = useState({
    startDate: '',
    endDate: ''
  });

  const { startDate, endDate } = downloadModalForm

  const [modalForm, setModalForm] = React.useState({ ...initialState });

  useEffect(() => {
    dispatch(getBalance());
    dispatch(getHistory(formData, (err, data) => {
      if (data) {
        setCurrentPage(data._meta.currentPage);
        setPageCount(data._meta.pageCount);
      }
    }));
  }, []);

  useEffect(() => {
    dispatch(getHistory(formData, (err, data) => {
      if (data) {
        setCurrentPage(data._meta.currentPage);
        setPageCount(data._meta.pageCount);
      }
    }));
  }, [searchParams])
  const onPageChange = (page) => {
    setSearchParams({
      page,
    })
  }
  const handleCloseModal = () => {
    setOpenItem({})
    setIsOpen(false)
    setItemIsOpen(false)
    setDownloadModal(false)
    setModalForm({ ...initialState });
    setDownloadModalForm({ startDate: '', endDate: '' })
    setErrorMessage('')
  }
  const handleNewIncome = () => {
    dispatch(newIncome({
      ...modalForm,
    }, (err, data) => {
      if (err && err.status === 'error') {
        setErrors(err.errors)
      } else if (data && data.status === 'ok') {
        setModalForm({ ...initialState });
        setIsOpen(false)
      }
    }))
  }
  const handleUpdateIncome = () => {
    dispatch(updateIncome({
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

  const handleChange = useCallback((key, value) => {
    setErrors({})
    modalForm[key] = value;
    setModalForm({ ...modalForm });
  }, [modalForm, setModalForm]);

  const handleChangeItem = useCallback((key, value) => {
    setErrors({})
    openItem[key] = value;
    setOpenItem({ ...openItem });
  }, [openItem, setOpenItem]);

  const handleChangeDownload = useCallback((key, value) => {
    downloadModalForm[key] = value;
    setDownloadModalForm({ ...downloadModalForm });
  }, [downloadModalForm, setDownloadModalForm]);
  const handleChooseItem = (item) => {
    setOpenItem(item)
    setItemIsOpen(true)
  }
  const handleDeleteItem = () => {
    dispatch(deleteIncome(openItem.id))
    setOpenItem(initialState)
    setItemIsOpen(false)
  }
  const handleDownload = async () => {
    if (!startDate || !endDate) {
      setErrorMessage("Please select start and end dates")
    } else {
      dispatch(downloadXlsx(downloadModalForm, (err, data) => {
        if (err?.status >= 400) {
          setErrorMessage(`No Results from ${downloadModalForm.startDate} to ${downloadModalForm.endDate}`)
        } else {
          const file = new Blob([data]);
          const fileUrl = URL.createObjectURL(file);
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = `${account.firstName || ''}_${account.lastName || ''}.xlsx`;
          link.click();
        }
      }))
    }
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
            <div className={'modal'}>
              <button className={'open-modal'} onClick={() => setIsOpen(true)}><OpenModal
                className={'open-modal-icon'}/>New
              </button>
              <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={handleCloseModal}
                contentLabel="Example Modal"
              >
                <h3 className={'modal-title'}>New</h3>
                <form className={'modal-form'}>
                  <input className={'modal-form-input'} placeholder={'Price'} type={'number'} value={modalForm.price}
                         onChange={(ev) => handleChange('price', ev.target.value)}/>
                  {errors.price ? <p className={'form-error-message'}>{errors.price}</p> : null}
                  <Select
                    className='modal-select'
                    placeholder='Choose price type'
                    value={priceType.find(i => i.value === modalForm.type)}
                    onChange={v => handleChange('type', v.value)}
                    options={priceType}
                    getOptionValue={item => item.value}
                    getOptionLabel={item => item.label}
                  />

                  {errors.date ? <p className={'form-error-message'}>{errors.date}</p> : null}
                  <DatePicker
                    wrapperClassName="datePicker"
                    placeholderText="date"
                    selected={moment(modalForm.date, 'YYYY-MM-DD').isValid() ? moment(modalForm.date, 'YYYY-MM-DD').toDate() : null}
                    onChange={(data) => {
                      handleChange('date', moment(data).isValid() ? moment(data).format('YYYY-MM-DD') : '')
                    }}
                    showYearDropdown
                    dateFormat="dd-MM-yyyy"
                    yearDropdownItemNumber={40}
                    scrollableYearDropdown
                  />

                  <input className={'modal-form-input'} placeholder={'Description'} value={modalForm.description}
                         onChange={(ev) => handleChange('description', ev.target.value)}/>
                  {errors.description ? <p className={'form-error-message'}>{errors.description}</p> : null}

                  <label className={'modal-checkbox'}>
                    <input
                      type="checkbox"
                      checked={modalForm.repeat}
                      onChange={() => handleChange('repeat', !modalForm.repeat)}
                    />
                    repeat
                  </label>

                  {modalForm.repeat ? <Select
                    className='modal-select'
                    placeholder='Choose repeat date type'
                    value={repeatDateTypes.find(i => i.value === modalForm.repeatDateType)}
                    onChange={v => handleChange('repeatDateType', v.value)}
                    options={repeatDateTypes}
                    getOptionValue={item => item.value}
                    getOptionLabel={item => item.label}
                  /> : null}
                  {errors.repeatDateType ? <p className={'form-error-message'}>{errors.repeatDateType}</p> : null}

                  {(modalForm.repeatDateType === 'day' && modalForm.repeat === true) ?
                    <input value={modalForm.repeatDayCount || ''}
                           onChange={(ev) => handleChange('repeatDayCount', ev.target.value)} type={'number'}
                           className={'modal-form-input'} placeholder={'Repeat days count'}/> : null}

                  {(modalForm.repeatDateType === 'week' && modalForm.repeat === true) ?
                    <Select
                      className='modal-select'
                      placeholder='Choose week day'
                      value={weekDays.find(i => i.value === modalForm.weekDay)}
                      onChange={v => handleChange('weekDay', v.value)}
                      options={weekDays}
                      getOptionValue={item => item.value}
                      getOptionLabel={item => item.label}
                    /> : null}

                  {(modalForm.repeatDateType === 'month' && modalForm.repeat === true) ? <div></div> : null}

                  {errors.repeatDayCount ? <p className={'form-error-message'}>{errors.repeatDayCount}</p> : null}
                </form>
                <div className="modal-buttons">
                  <button className={'modal-form-button'} onClick={handleNewIncome}>ADD</button>
                  <button className={'close-modal'} onClick={handleCloseModal}>CLOSE</button>
                </div>
              </Modal>
            </div>
          </div>
          <div className={'balance-block'}>
            <Balance balance={balance.balance} income={balance.income} spending={balance.spending}/>
          </div>
          <div className={'history-block'}>
            <div className={'history-titles'}>
              <p className={'history-titles-description'}>Description</p>
              <p className={'history-titles-created'}>Created in date</p>
              <p className={'history-titles-price'}>Price</p>
            </div>
            {balanceHistory ? balanceHistory.map((balance) => (
              <div className={'history-item'} key={balance.id} onClick={() => handleChooseItem(balance)}>
                <p className={'history-item-description'}>{balance.description || 'none description'}</p>
                <p className={'history-item-createdAt'}>{moment.utc(balance.createdAt).local().format('DD-MM-YYYY')}</p>
                <p className={'history-item-price'}
                   style={{ color: balance.type === 'up' ? 'green' : 'red' }}>{balance.type === 'up' ? '+ ' : '- '}{balance.price}</p>
              </div>)) : <div>not results</div>}
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
                    onChange={v => handleChangeItem('type', v.value)}
                    options={priceType}
                    getOptionValue={item => item.value}
                    getOptionLabel={item => item.label}
                  />
                  <input className={'modal-form-input'} placeholder={'Description'} value={openItem.description}
                         onChange={(ev) => handleChangeItem('description', ev.target.value)}/>
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
          <div className={'modal'}>
            {!_.isEmpty(balanceHistory) ?
              <button style={{ background: "green", margin: "15px 0 " }} className={'notifications-buttons-item'}
                      onClick={() => setDownloadModal(true)}>download
              </button> : null}
            <Modal
              isOpen={downloadModal}
              style={customStyles}
              onRequestClose={handleCloseModal}
              contentLabel="Example Modal"
            >
              <h3 className={'modal-title'}>select date</h3>
              <p className='form-error-message'>
                {errorMessage}
              </p>

              <DatePicker
                wrapperClassName="datePicker"
                placeholderText="Start date"
                selected={moment(downloadModalForm.startDate, 'YYYY-MM-DD').isValid() ? moment(downloadModalForm.startDate, 'YYYY-MM-DD').toDate() : null}
                onChange={(data) => {
                  handleChangeDownload('startDate', moment(data).isValid() ? moment(data).format('YYYY-MM-DD') : '')
                }}
                showYearDropdown
                dateFormat="dd-MM-yyyy"
                yearDropdownItemNumber={10}
                scrollableYearDropdown
              />

              <DatePicker
                wrapperClassName="datePicker"
                placeholderText="End date"
                selected={moment(downloadModalForm.endDate, 'YYYY-MM-DD').isValid() ? moment(downloadModalForm.endDate, 'YYYY-MM-DD').toDate() : null}
                onChange={(data) => {
                  handleChangeDownload('endDate', moment(data).isValid() ? moment(data).format('YYYY-MM-DD') : '')
                }}
                showYearDropdown
                dateFormat="dd-MM-yyyy"
                yearDropdownItemNumber={10}
                scrollableYearDropdown
              />

              <div className="modal-buttons">
                <button className={'modal-form-button'} onClick={handleDownload}>DOWNLOAD</button>
              </div>
            </Modal>
          </div>
          <Pagination totalPages={pageCount} page={currentPage} pageChange={(page) => onPageChange(page)}/>
        </div>
      </div>
    </Wrapper>
  );
}

export default History;
