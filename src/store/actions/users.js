export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';


export function registerUser(data, cb) {
  return {
    type: REGISTER_USER_REQUEST,
    payload: { data, cb }
  }
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';

export function logIn(data, cb) {
  return {
    type: LOG_IN_REQUEST,
    payload: { data, cb }
  }
}

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export function updateUser(data, cb) {
  return {
    type: UPDATE_USER_REQUEST,
    payload: { data, cb }
  }
}

export const GET_MY_ACCOUNT_REQUEST = 'GET_MY_ACCOUNT_REQUEST';
export const GET_MY_ACCOUNT_SUCCESS = 'GET_MY_ACCOUNT_SUCCESS';
export const GET_MY_ACCOUNT_FAIL = 'GET_MY_ACCOUNT_FAIL';

export function getMyAccount(cb) {
  return {
    type: GET_MY_ACCOUNT_REQUEST,
    payload: { cb }
  }
}

export const USER_VERIFY_REQUEST = 'USER_VERIFY_REQUEST';
export const USER_VERIFY_SUCCESS = 'USER_VERIFY_SUCCESS';
export const USER_VERIFY_FAIL = 'USER_VERIFY_FAIL';

export function verifyAccount(data, cb) {

  return {
    type: USER_VERIFY_REQUEST,
    payload: { data, cb }
  }
}

export const RESEND_VERIFY_CODE_REQUEST = 'RESEND_VERIFY_CODE_REQUEST';
export const RESEND_VERIFY_CODE_SUCCESS = 'RESEND_VERIFY_CODE_SUCCESS';
export const RESEND_VERIFY_CODE_FAIL = 'RESEND_VERIFY_CODE_FAIL';

export function resendVerifyCode(email, cb) {

  return {
    type: RESEND_VERIFY_CODE_REQUEST,
    payload: { email, cb }
  }
}

export const CHANGE_PASS_REQUEST = 'CHANGE_PASS_REQUEST';
export const CHANGE_PASS_SUCCESS = 'CHANGE_PASS_SUCCESS';
export const CHANGE_PASS_FAIL = 'CHANGE_PASS_FAIL';

export function changePass(data, cb) {

  return {
    type: CHANGE_PASS_REQUEST,
    payload: { data, cb }
  }
}

export const FORGOT_PASS_REQUEST = 'FORGOT_PASS_REQUEST';
export const FORGOT_PASS_SUCCESS = 'FORGOT_PASS_SUCCESS';
export const FORGOT_PASS_FAIL = 'FORGOT_PASS_FAIL';

export function forgotPass(data, cb) {

  return {
    type: FORGOT_PASS_REQUEST,
    payload: { data, cb }
  }
}

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL';

export function resetPassword(data, cb) {

  return {
    type: RESET_PASSWORD_REQUEST,
    payload: { data, cb }
  }
}


export const GET_NOTIFICATIONS_REQUEST = 'GET_NOTIFICATIONS_REQUEST';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAIL = 'GET_NOTIFICATIONS_FAIL';

export function getNotifications(data, cb) {
  return {
    type: GET_NOTIFICATIONS_REQUEST,
    payload: { data, cb }
  }
}


export const SEEN_NOTIFICATION_REQUEST = 'SEEN_NOTIFICATION_REQUEST';
export const SEEN_NOTIFICATION_SUCCESS = 'SEEN_NOTIFICATION_SUCCESS';
export const SEEN_NOTIFICATION_FAIL = 'SEEN_NOTIFICATION_FAIL';

export function seenNotification() {

  return {
    type: SEEN_NOTIFICATION_REQUEST,
  }
}

export const ACCEPT_INCOME_REQUEST = 'ACCEPT_INCOME_REQUEST';
export const ACCEPT_INCOME_SUCCESS = 'ACCEPT_INCOME_SUCCESS';
export const ACCEPT_INCOME_FAIL = 'ACCEPT_INCOME_FAIL';

export function acceptIncome(id) {
  return {
    type: ACCEPT_INCOME_REQUEST,
    payload: { id }
  }
}


export const REJECT_INCOME_REQUEST = 'REJECT_INCOME_REQUEST';
export const REJECT_INCOME_SUCCESS = 'REJECT_INCOME_SUCCESS';
export const REJECT_INCOME_FAIL = 'REJECT_INCOME_FAIL';

export function rejectIncome(id) {
  return {
    type: REJECT_INCOME_REQUEST,
    payload: { id }
  }
}

