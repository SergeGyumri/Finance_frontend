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
import { toast } from "react-toastify";


const initialState = {
  balance: {
    income: 0,
    spending: 0,
    balance: 0
  },
  balanceHistory: [],
  repeatHistory: [],
  deletedHistory: []
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BALANCE_REQUEST: {
      return {
        ...state,
      }
    }
    case GET_BALANCE_SUCCESS: {
      const { balance } = action.payload
      return {
        ...state,
        balance,
      }
    }
    case GET_BALANCE_FAIL: {
      return {
        ...state,
      }
    }

    case GET_HISTORY_REQUEST: {
      return {
        ...state,
      }
    }
    case GET_HISTORY_SUCCESS: {
      const { balance, balanceHistory } = action.payload;
      return {
        ...state,
        balanceHistory,
        balance,
      }
    }
    case GET_HISTORY_FAIL: {
      return {
        ...state,
      }
    }

    case GET_REPEAT_LIST_REQUEST: {
      return {
        ...state,
      }
    }
    case GET_REPEAT_LIST_SUCCESS: {
      const { repeatHistory } = action.payload
      return {
        ...state,
        repeatHistory,
      }
    }
    case GET_REPEAT_LIST_FAIL: {
      return {
        ...state,
      }
    }

    case NEW_INCOME_REQUEST: {
      return {
        ...state,
      }
    }
    case NEW_INCOME_SUCCESS: {
      toast.success('Successfully created!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      window.location.reload();
      return {
        ...state,
      }
    }
    case NEW_INCOME_FAIL: {
      return {
        ...state,
      }
    }

    case UPDATE_INCOME_REQUEST: {
      return {
        ...state,
      }
    }
    case UPDATE_INCOME_SUCCESS: {
      const { income, balance } = action.payload
      let newHistory = state.balanceHistory;
      const foundIndex = newHistory.findIndex(i => i.id === income.id);
      newHistory[foundIndex] = income;
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
        balanceHistory: newHistory,
        balance,
      }
    }
    case UPDATE_INCOME_FAIL: {
      return {
        ...state,
      }
    }

    case DELETE_INCOME_REQUEST: {
      return {
        ...state,
      }
    }
    case DELETE_INCOME_SUCCESS: {
      const { id, balance } = action.payload
      let newHistory = state.balanceHistory.filter(i => +i.id !== +id);
      toast.success('Successfully deleted!', {
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
        balanceHistory: newHistory,
        balance,
      }
    }
    case DELETE_INCOME_FAIL: {
      return {
        ...state,
      }
    }

    case UPDATE_REPEAT_INCOME_REQUEST: {
      return {
        ...state,
      }
    }
    case UPDATE_REPEAT_INCOME_SUCCESS: {
      const { income } = action.payload
      let repeatHistory = state.repeatHistory;
      const foundIndex = repeatHistory.findIndex(i => i.id === income.id);
      repeatHistory[foundIndex] = income;
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
        repeatHistory,
      }
    }
    case UPDATE_REPEAT_INCOME_FAIL: {
      return {
        ...state,
      }
    }

    case DELETE_REPEAT_INCOME_REQUEST: {
      return {
        ...state,
      }
    }
    case DELETE_REPEAT_INCOME_SUCCESS: {
      const { incomeId } = action.payload;
      const repeatHistory = state.repeatHistory.filter(i => +i.id !== +incomeId);

      toast.success('Successfully deleted!', {
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
        repeatHistory,
      }
    }
    case DELETE_REPEAT_INCOME_FAIL: {
      return {
        ...state,
      }
    }

    case GET_DELETED_LIST_REQUEST: {
      return {
        ...state,
      }
    }
    case GET_DELETED_LIST_SUCCESS: {
      const { deletedHistory } = action.payload;

      return {
        ...state,
        deletedHistory: [...deletedHistory],
      }
    }
    case GET_DELETED_LIST_FAIL: {
      return {
        ...state,
      }
    }

    case RESUME_INCOME_REQUEST: {
      return {
        ...state,
      }
    }
    case RESUME_INCOME_SUCCESS: {
      const { incomeId } = action.payload;
      return {
        ...state,
        deletedHistory: state.deletedHistory.filter(income => +income.id !== +incomeId),
      }
    }
    case RESUME_INCOME_FAIL: {
      return {
        ...state,
      }
    }

    case DOWNLOAD_REQUEST: {
      return {
        ...state,
      }
    }
    case DOWNLOAD_SUCCESS: {
      return {
        ...state,
      }
    }
    case DOWNLOAD_FAIL: {
      return {
        ...state,
      }
    }

    default: {
      return state
    }
  }
}
