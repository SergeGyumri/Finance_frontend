import { takeLatest, call, put } from 'redux-saga/effects'
import {
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAIL,
  GET_MY_ACCOUNT_REQUEST, GET_MY_ACCOUNT_SUCCESS, GET_MY_ACCOUNT_FAIL,
  USER_VERIFY_REQUEST, USER_VERIFY_SUCCESS, USER_VERIFY_FAIL,
  RESEND_VERIFY_CODE_REQUEST, RESEND_VERIFY_CODE_SUCCESS, RESEND_VERIFY_CODE_FAIL,
  FORGOT_PASS_REQUEST, FORGOT_PASS_SUCCESS, FORGOT_PASS_FAIL,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
  SEEN_NOTIFICATION_REQUEST, SEEN_NOTIFICATION_SUCCESS, SEEN_NOTIFICATION_FAIL,
  GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAIL,
  ACCEPT_INCOME_REQUEST, ACCEPT_INCOME_SUCCESS, ACCEPT_INCOME_FAIL,
  REJECT_INCOME_REQUEST, REJECT_INCOME_SUCCESS, REJECT_INCOME_FAIL,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,
  CHANGE_PASS_REQUEST, CHANGE_PASS_SUCCESS, CHANGE_PASS_FAIL
} from "../actions/users";
import Api from "../../Api";

export default function* watcher() {
  yield takeLatest(REGISTER_USER_REQUEST, handleRegister);
  yield takeLatest(UPDATE_USER_REQUEST, handleUpdate);
  yield takeLatest(CHANGE_PASS_REQUEST, handleChangePass);
  yield takeLatest(LOG_IN_REQUEST, handleLogIn);
  yield takeLatest(GET_MY_ACCOUNT_REQUEST, handleGetMyAccount);
  yield takeLatest(USER_VERIFY_REQUEST, handleVerify);
  yield takeLatest(RESEND_VERIFY_CODE_REQUEST, handleResend);
  yield takeLatest(FORGOT_PASS_REQUEST, handleForgotPass);
  yield takeLatest(RESET_PASSWORD_REQUEST, handleResetPass);
  yield takeLatest(GET_NOTIFICATIONS_REQUEST, getNotifications);
  yield takeLatest(SEEN_NOTIFICATION_REQUEST, seenNotification);
  yield takeLatest(ACCEPT_INCOME_REQUEST, acceptIncome);
  yield takeLatest(REJECT_INCOME_REQUEST, rejectIncome);
}

function* handleRegister(action) {
  try {
    const { data } = yield call(Api.register, action.payload.data);
    yield put({
      type: REGISTER_USER_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: REGISTER_USER_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(e.response.data, null)
    }
  }
}

function* handleChangePass(action) {
  try {
    const { data } = yield call(Api.changePass, action.payload.data);
    yield put({
      type: CHANGE_PASS_SUCCESS,
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: CHANGE_PASS_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(e?.response?.data, null)
    }
  }
}

function* handleUpdate(action) {
  try {
    const { data: { user } } = yield call(Api.update, action.payload.data);
    yield put({
      type: UPDATE_USER_SUCCESS,
      payload: { user }
    })
    if (action.payload.cb) {
      action.payload.cb(null, user);
    }
  } catch (e) {
    yield put({
      type: UPDATE_USER_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(e.response.data, null)
    }
  }
}

function* handleLogIn(action) {
  try {
    const { data } = yield call(Api.logIn, action.payload.data);
    yield put({
      type: LOG_IN_SUCCESS,
      payload: data
    })
  } catch ({ response }) {
    yield put({
      type: LOG_IN_FAIL,
      payload: response.data
    });
    if (action.payload.cb) {
      action.payload.cb(response.data, null)
    }
  }
}

function* handleVerify(action) {
  try {
    const { data } = yield call(Api.verify, action.payload.data);
    yield put({
      type: USER_VERIFY_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: USER_VERIFY_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(e.response.data, null)
    }
  }
}

function* handleResend(action) {
  try {
    const { data } = yield call(Api.resend, action.payload.email);
    yield put({
      type: RESEND_VERIFY_CODE_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: RESEND_VERIFY_CODE_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(e.response.data, null)
    }
  }
}

function* handleForgotPass(action) {
  try {
    const { data } = yield call(Api.forgot, action.payload.data);
    yield put({
      type: FORGOT_PASS_SUCCESS,
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: FORGOT_PASS_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(e.response.data, null)
    }
  }
}

function* handleResetPass(action) {
  try {
    const { data } = yield call(Api.resetPass, action.payload.data);
    yield put({
      type: RESET_PASSWORD_SUCCESS,
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: RESET_PASSWORD_FAIL,
    });
    if (action.payload.cb) {
      action.payload.cb(e.response.data, null)
    }
  }
}

function* handleGetMyAccount(action) {
  try {
    const { data: { user } } = yield call(Api.getMyAccount);
    yield put({
      type: GET_MY_ACCOUNT_SUCCESS,
      payload: user
    })
    if (action.payload.cb) {
      action.payload.cb(user)
    }
  } catch (e) {
    yield put({
      type: GET_MY_ACCOUNT_FAIL,
    });
  }
}

function* getNotifications(action) {
  try {
    const { data } = yield call(Api.getNotifications, action.payload.data);

    yield put({
      type: GET_NOTIFICATIONS_SUCCESS,
      payload: data
    })
    if (action.payload.cb) {
      action.payload.cb(null, data);
    }
  } catch (e) {
    yield put({
      type: GET_NOTIFICATIONS_FAIL,
    });
  }
}

function* seenNotification() {
  try {
    yield call(Api.seen);
    yield put({
      type: SEEN_NOTIFICATION_SUCCESS,
    })
  } catch (e) {
    yield put({
      type: SEEN_NOTIFICATION_FAIL,
    });
  }
}

function* acceptIncome(action) {
  try {
    const { data } = yield call(Api.acceptIncome, action.payload.id);

    yield put({
      type: ACCEPT_INCOME_SUCCESS,
      payload: data
    })
  } catch (e) {
    yield put({
      type: ACCEPT_INCOME_FAIL,
    });
  }
}

function* rejectIncome(action) {
  try {
    const { data } = yield call(Api.rejectIncome, action.payload.id);

    yield put({
      type: REJECT_INCOME_SUCCESS,
      payload: data
    })
  } catch (e) {
    yield put({
      type: REJECT_INCOME_FAIL,
    });
  }
}

