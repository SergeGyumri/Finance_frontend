import { applyMiddleware, legacy_createStore } from "redux";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import createSagaMiddleware from 'redux-saga';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import React from 'react';

import App from './App';
import './assets/style.css'
import sagas from './store/saga';
import reducers from "./store/reducers";
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from "react-toastify";

const saga = createSagaMiddleware()

const store = legacy_createStore(
  reducers,
  applyMiddleware(saga, thunk)
)
saga.run(sagas)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ToastContainer />
    <App/>
  </Provider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
