import { takeLatest, call, put } from 'redux-saga/effects'
import {
  GET_BALANCE_REQUEST, GET_BALANCE_SUCCESS, GET_BALANCE_FAIL,
  GET_HISTORY_REQUEST, GET_HISTORY_SUCCESS, GET_HISTORY_FAIL,
  GET_REPEAT_LIST_REQUEST, GET_REPEAT_LIST_SUCCESS, GET_REPEAT_LIST_FAIL,
  NEW_INCOME_REQUEST, NEW_INCOME_SUCCESS, NEW_INCOME_FAIL,
  UPDATE_INCOME_REQUEST, UPDATE_INCOME_SUCCESS, UPDATE_INCOME_FAIL,
  DELETE_INCOME_REQUEST, DELETE_INCOME_SUCCESS, DELETE_INCOME_FAIL,
  UPDATE_REPEAT_INCOME_REQUEST, UPDATE_REPEAT_INCOME_SUCCESS, UPDATE_REPEAT_INCOME_FAIL,
  DELETE_REPEAT_INCOME_REQUEST, DELETE_REPEAT_INCOME_SUCCESS, DELETE_REPEAT_INCOME_FAIL,
  GET_DELETED_LIST_REQUEST, GET_DELETED_LIST_SUCCESS, GET_DELETED_LIST_FAIL,
  RESUME_INCOME_REQUEST, RESUME_INCOME_SUCCESS, RESUME_INCOME_FAIL,
  DOWNLOAD_REQUEST, DOWNLOAD_SUCCESS, DOWNLOAD_FAIL,
} from "../actions/balance";
import Api from "../../Api";

export default function* watcher() {
  yield takeLatest(GET_BALANCE_REQUEST, getBalance);
  yield takeLatest(GET_HISTORY_REQUEST, getHistory);
  yield takeLatest(GET_REPEAT_LIST_REQUEST, getRepeatList);
  yield takeLatest(NEW_INCOME_REQUEST, newIncome);
  yield takeLatest(UPDATE_INCOME_REQUEST, updateIncome);
  yield takeLatest(DELETE_INCOME_REQUEST, deleteIncome);
  yield takeLatest(UPDATE_REPEAT_INCOME_REQUEST, updateRepeatedIncome);
  yield takeLatest(DELETE_REPEAT_INCOME_REQUEST, deleteRepeatedIncome);
  yield takeLatest(GET_DELETED_LIST_REQUEST, getDeletedList);
  yield takeLatest(RESUME_INCOME_REQUEST, resumeIncome);
  yield takeLatest(DOWNLOAD_REQUEST, downloadXlsx);
}

function* getBalance() {
  try {
    const { data } = yield call(Api.getBalance);
    yield put({
      type: GET_BALANCE_SUCCESS,
      payload: data
    })
  } catch (e) {
    yield put({
      type: GET_BALANCE_FAIL,
    });
  }
}

function* getHistory(action) {
  try {
    const { data } = yield call(Api.getHistory, action.payload.data);
    yield put({
      type: GET_HISTORY_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: GET_HISTORY_FAIL,
    });
  }
}

function* getRepeatList(action) {
  try {
    const { data } = yield call(Api.getRepeatList, action.payload.data);
    yield put({
      type: GET_REPEAT_LIST_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: GET_REPEAT_LIST_FAIL,
    });
  }
}

function* getDeletedList(action) {
  try {
    const { data } = yield call(Api.getDeletedList, action.payload.data);
    yield put({
      type: GET_DELETED_LIST_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: GET_DELETED_LIST_FAIL,
    });
  }
}

function* newIncome(action) {
  try {
    const { data } = yield call(Api.newIncome, action.payload.data);
    yield put({
      type: NEW_INCOME_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch ({ response }) {
    yield put({
      type: NEW_INCOME_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(response?.data, null);
    }
  }
}

function* updateIncome(action) {
  try {
    const { data } = yield call(Api.updateIncome, action.payload.data);
    yield put({
      type: UPDATE_INCOME_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: UPDATE_INCOME_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(e?.response?.data, null);
    }
  }
}

function* deleteIncome(action) {
  try {
    const { data } = yield call(Api.deleteIncome, action.payload.id);
    yield put({
      type: DELETE_INCOME_SUCCESS,
      payload: data
    })

  } catch (e) {
    yield put({
      type: DELETE_INCOME_FAIL,
    });

  }
}

function* updateRepeatedIncome(action) {
  try {
    const { data } = yield call(Api.updateRepeatedIncome, action.payload.data);
    yield put({
      type: UPDATE_REPEAT_INCOME_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch ({ response }) {
    yield put({
      type: UPDATE_REPEAT_INCOME_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(response?.data, null);
    }
  }
}

function* deleteRepeatedIncome(action) {
  try {
    const { data } = yield call(Api.deleteRepeatedIncome, action.payload.id);
    yield put({
      type: DELETE_REPEAT_INCOME_SUCCESS,
      payload: data
    })
  } catch (e) {
    yield put({
      type: DELETE_REPEAT_INCOME_FAIL,
    });
  }
}

function* resumeIncome(action) {
  try {
    const { data } = yield call(Api.resumeIncome, action.payload.id);
    yield put({
      type: RESUME_INCOME_SUCCESS,
      payload: data
    })
  } catch (e) {
    yield put({
      type: RESUME_INCOME_FAIL,
    });
  }
}

function* downloadXlsx(action) {
  try {
    const { data } = yield call(Api.download, action.payload.data);

    yield put({
      type: DOWNLOAD_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch ({ response }) {
    yield put({
      type: DOWNLOAD_FAIL,
    });

    if (action.payload.cb) {
      action.payload.cb(response, null)
    }
  }
}

