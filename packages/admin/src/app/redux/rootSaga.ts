import { all, fork } from 'redux-saga/effects';
import auth from './auth/auth.saga';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* root() {
  yield all([fork(auth)]);
}
