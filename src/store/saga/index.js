import { all, fork } from 'redux-saga/effects'
import users from './users';
import balance from './balance';

export default function* watchers() {

  yield all([
    users,
    balance,
  ].map(fork))

}
