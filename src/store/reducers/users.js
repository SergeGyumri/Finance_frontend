import {
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAIL,
  GET_MY_ACCOUNT_REQUEST, GET_MY_ACCOUNT_SUCCESS, GET_MY_ACCOUNT_FAIL,
  USER_VERIFY_REQUEST, USER_VERIFY_SUCCESS, USER_VERIFY_FAIL,
  RESEND_VERIFY_CODE_REQUEST, RESEND_VERIFY_CODE_SUCCESS, RESEND_VERIFY_CODE_FAIL,
  SEEN_NOTIFICATION_REQUEST, SEEN_NOTIFICATION_SUCCESS, SEEN_NOTIFICATION_FAIL,
  GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAIL,
  ACCEPT_INCOME_REQUEST, ACCEPT_INCOME_SUCCESS, ACCEPT_INCOME_FAIL,
  REJECT_INCOME_REQUEST, REJECT_INCOME_SUCCESS, REJECT_INCOME_FAIL,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,
  CHANGE_PASS_REQUEST, CHANGE_PASS_SUCCESS, CHANGE_PASS_FAIL,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
  FORGOT_PASS_REQUEST, FORGOT_PASS_SUCCESS, FORGOT_PASS_FAIL,
} from "../actions/users";

import Token from "../../services/Token";
import { toast } from "react-toastify";


const initialState = {
  token: Token.getToken(),
  account: {
    birthDate: '',
    firstName: '',
    lastName: '',
    email: '',
    notificationCount: 0
  },
  notifications: []
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
      }
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
      }
    }
    case REGISTER_USER_FAIL: {
      return {
        ...state,
      }
    }

    case LOG_IN_REQUEST: {
      return {
        ...state,
      }
    }
    case LOG_IN_SUCCESS: {
      const { token } = action.payload
      toast.success('Welcome!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      Token.setToken(token)
      return {
        ...state,
        token,
      }
    }
    case LOG_IN_FAIL: {
      if (action.payload && action.payload.message.toLowerCase() === 'not verified') {
        return {
          ...state,
          verifyEmail: action.payload.email
        }
      }
      return {
        ...state,
      }
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
      }
    }
    case UPDATE_USER_SUCCESS: {
      const { user: { birthDate, firstName, lastName } } = action.payload
      toast.success('Successfully updated!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return {
        ...state,
        account: {
          ...state.account,
          birthDate,
          firstName,
          lastName,
        }
      }
    }
    case UPDATE_USER_FAIL: {
      toast.error('Invalid values!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return {
        ...state,
      }
    }

    case GET_MY_ACCOUNT_REQUEST: {
      return {
        ...state,
      }
    }
    case GET_MY_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: { ...action.payload },
      }
    }
    case GET_MY_ACCOUNT_FAIL: {
      Token.delete();
      return {
        ...state,
        token: ''
      }
    }

    case USER_VERIFY_REQUEST: {
      return {
        ...state,
      }
    }
    case USER_VERIFY_SUCCESS: {
      const { token } = action.payload
      Token.setToken(token)
      toast.success('Successfully verified!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return {
        ...state,
        token,
      }
    }
    case USER_VERIFY_FAIL: {
      return {
        ...state,
      }
    }

    case RESEND_VERIFY_CODE_REQUEST: {
      return {
        ...state,
      }
    }
    case RESEND_VERIFY_CODE_SUCCESS: {
      return {
        ...state,
      }
    }
    case RESEND_VERIFY_CODE_FAIL: {
      return {
        ...state,
      }
    }

    case GET_NOTIFICATIONS_REQUEST: {
      return {
        ...state,
      }
    }
    case GET_NOTIFICATIONS_SUCCESS: {
      const { notifications } = action.payload
      return {
        ...state,
        notifications,
      }
    }
    case GET_NOTIFICATIONS_FAIL: {
      return {
        ...state,
      }
    }

    case SEEN_NOTIFICATION_REQUEST: {
      return {
        ...state,
      }
    }
    case SEEN_NOTIFICATION_SUCCESS: {
      const account = state.account
      account.notificationCount = 0;
      return {
        ...state,
        account: { ...account },
      }
    }
    case SEEN_NOTIFICATION_FAIL: {
      return {
        ...state,
      }
    }

    case ACCEPT_INCOME_REQUEST: {
      return {
        ...state,
      }
    }
    case ACCEPT_INCOME_SUCCESS: {
      const { incomeId } = action.payload
      const newIncome = state.notifications.find(({ income }) => +income.id === +incomeId);
      newIncome.income.status = 1
      const findIndex = state.notifications.findIndex(({ income }) => +income.id === +incomeId);
      const notifications = state.notifications

      notifications[findIndex] = newIncome
      return {
        ...state,
        notifications: [...notifications],
      }
    }
    case ACCEPT_INCOME_FAIL: {
      return {
        ...state,
      }
    }

    case REJECT_INCOME_REQUEST: {
      return {
        ...state,
      }
    }
    case REJECT_INCOME_SUCCESS: {
      const { incomeId } = action.payload
      const newIncome = state.notifications.find(({ income }) => +income.id === +incomeId);
      newIncome.income.status = 0
      const findIndex = state.notifications.findIndex(({ income }) => +income.id === +incomeId);
      const notifications = state.notifications

      notifications[findIndex] = newIncome
      return {
        ...state,
        notifications: [...notifications]
      }
    }
    case REJECT_INCOME_FAIL: {
      return {
        ...state,
      }
    }

    case CHANGE_PASS_REQUEST: {
      return {
        ...state,
      }
    }
    case CHANGE_PASS_SUCCESS: {
      toast.success('Password successfully changed!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return {
        ...state,
      }
    }
    case CHANGE_PASS_FAIL: {
      toast.error('Invalid values', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return {
        ...state,
      }
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
      }
    }
    case RESET_PASSWORD_FAIL: {
      return {
        ...state,
      }
    }

    case FORGOT_PASS_REQUEST: {
      return {
        ...state,
      }
    }
    case FORGOT_PASS_SUCCESS: {
      return {
        ...state,
      }
    }
    case FORGOT_PASS_FAIL: {
      return {
        ...state,
      }
    }

    default: {
      return state
    }
  }
}
