import axios from "axios";
import Token from './services/Token'

const { REACT_APP_API_URL } = process.env;
const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = Token.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, e => Promise.reject(e));


class Api {
  static download(data = {}) {
    return api.get('balance/download', { params: {
        ...data
      },
      responseType: 'arraybuffer'
    });
  }

  static register(data = {}) {
    return api.post('users/register', data);
  }

  static update(data = {}) {
    return api.put('users/update', data);
  }

  static changePass(data = {}) {
    return api.put('users/change-pass', data);
  }

  static logIn(data = {}) {
    return api.post('users/login', data);
  }

  static getMyAccount() {
    return api.get('users/account');
  }

  static verify(data = {}) {
    return api.post('/users/verify', data);
  }

  static resend(email) {
    return api.post('/users/resend', {email});
  }

  static forgot(data) {
    return api.post('/users/forgot-pass', data);
  }

  static resetPass(data) {
    return api.put('/users/reset-pass', data);
  }

  static getBalance() {
    return api.get('/balance/balance');
  }

  static getHistory(data) {
    return api.get('/balance/history', { params: data });
  }

  static getRepeatList(data) {
    return api.get('/balance/repeat-history', { params: data });
  }

  static getDeletedList(data) {
    return api.get('/balance/deleted-history', { params: data });
  }

  static newIncome(data) {
    return api.post('/balance/income', data);
  }

  static updateIncome(data) {
    return api.put('/balance/income', data);
  }

  static deleteIncome(id) {
    return api.delete(`/balance/income/${id}`);
  }

  static updateRepeatedIncome(data) {
    return api.put('/balance/repeat-income', { ...data });
  }

  static deleteRepeatedIncome(id) {
    return api.delete(`/balance/repeat-income/${id}`);
  }

  static getNotifications(data) {
    return api.get(`/balance/notifications`, { data });
  }

  static seen() {
    return api.put(`/balance/seen`);
  }

  static acceptIncome(id) {
    return api.put(`/balance/accept/${id}`);
  }

  static rejectIncome(id) {
    return api.put(`/balance/reject/${id}`);
  }

  static resumeIncome(id) {
    return api.put(`/balance/resume/${id}`);
  }
}

export default Api
