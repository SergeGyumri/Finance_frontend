export const GET_BALANCE_REQUEST = 'GET_BALANCE_REQUEST';
export const GET_BALANCE_SUCCESS = 'GET_BALANCE_SUCCESS';
export const GET_BALANCE_FAIL = 'GET_BALANCE_FAIL';


export function getBalance() {
  return {
    type: GET_BALANCE_REQUEST,
  }
}

export const GET_HISTORY_REQUEST = 'GET_HISTORY_REQUEST';
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS';
export const GET_HISTORY_FAIL = 'GET_HISTORY_FAIL';

export function getHistory(data, cb) {
  return {
    type: GET_HISTORY_REQUEST,
    payload: { data, cb }
  }
}

export const GET_REPEAT_LIST_REQUEST = 'GET_REPEAT_LIST_REQUEST';
export const GET_REPEAT_LIST_SUCCESS = 'GET_REPEAT_LIST_SUCCESS';
export const GET_REPEAT_LIST_FAIL = 'GET_REPEAT_LIST_FAIL';

export function getRepeatList(data, cb) {
  return {
    type: GET_REPEAT_LIST_REQUEST,
    payload: { data, cb }
  }
}

export const GET_DELETED_LIST_REQUEST = 'GET_DELETED_LIST_REQUEST';
export const GET_DELETED_LIST_SUCCESS = 'GET_DELETED_LIST_SUCCESS';
export const GET_DELETED_LIST_FAIL = 'GET_DELETED_LIST_FAIL';

export function getDeletedList(data, cb) {
  return {
    type: GET_DELETED_LIST_REQUEST,
    payload: { data, cb }
  }
}

export const NEW_INCOME_REQUEST = 'NEW_INCOME_REQUEST';
export const NEW_INCOME_SUCCESS = 'NEW_INCOME_SUCCESS';
export const NEW_INCOME_FAIL = 'NEW_INCOME_FAIL';

export function newIncome(data, cb) {

  return {
    type: NEW_INCOME_REQUEST,
    payload: { data, cb }
  }
}

export const UPDATE_INCOME_REQUEST = 'UPDATE_INCOME_REQUEST';
export const UPDATE_INCOME_SUCCESS = 'UPDATE_INCOME_SUCCESS';
export const UPDATE_INCOME_FAIL = 'UPDATE_INCOME_FAIL';

export function updateIncome(data, cb) {

  return {
    type: UPDATE_INCOME_REQUEST,
    payload: { data, cb }
  }
}

export const DELETE_INCOME_REQUEST = 'DELETE_INCOME_REQUEST';
export const DELETE_INCOME_SUCCESS = 'DELETE_INCOME_SUCCESS';
export const DELETE_INCOME_FAIL = 'DELETE_INCOME_FAIL';

export function deleteIncome(id) {

  return {
    type: DELETE_INCOME_REQUEST,
    payload: { id }
  }
}

export const UPDATE_REPEAT_INCOME_REQUEST = 'UPDATE_REPEAT_INCOME_REQUEST';
export const UPDATE_REPEAT_INCOME_SUCCESS = 'UPDATE_REPEAT_INCOME_SUCCESS';
export const UPDATE_REPEAT_INCOME_FAIL = 'UPDATE_REPEAT_INCOME_FAIL';

export function updateRepeatedIncome(data, cb) {

  return {
    type: UPDATE_REPEAT_INCOME_REQUEST,
    payload: { data, cb }
  }
}

export const DELETE_REPEAT_INCOME_REQUEST = 'DELETE_REPEAT_INCOME_REQUEST';
export const DELETE_REPEAT_INCOME_SUCCESS = 'DELETE_REPEAT_INCOME_SUCCESS';
export const DELETE_REPEAT_INCOME_FAIL = 'DELETE_REPEAT_INCOME_FAIL';

export function deleteRepeatedIncome(id) {

  return {
    type: DELETE_REPEAT_INCOME_REQUEST,
    payload: { id }
  }
}

export const RESUME_INCOME_REQUEST = 'RESUME_INCOME_REQUEST';
export const RESUME_INCOME_SUCCESS = 'RESUME_INCOME_SUCCESS';
export const RESUME_INCOME_FAIL = 'RESUME_INCOME_FAIL';

export function resumeIncome(id) {

  return {
    type: RESUME_INCOME_REQUEST,
    payload: { id }
  }
}

export const DOWNLOAD_REQUEST = 'DOWNLOAD_REQUEST';
export const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS';
export const DOWNLOAD_FAIL = 'DOWNLOAD_FAIL';

export function downloadXlsx(data, cb) {

  return {
    type: DOWNLOAD_REQUEST,
    payload: { data, cb }
  }
}
