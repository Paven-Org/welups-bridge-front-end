import { call, put, takeLatest } from 'redux-saga/effects';
import * as authSvc from 'app/services/auth.service';
import * as actions from 'app/redux/auth/auth.action';
import { loginSuccess, logoutSuccess } from './auth.slice';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function* sagas() {
  yield takeLatest(actions.loginAction, loginHandler);
  yield takeLatest(actions.logoutAction, logoutHandler);
}

function* loginHandler({ payload }: ReturnType<typeof actions.loginAction>) {
  try {
    const { username, password } = payload;
    const {
      data: { token },
    } = yield call(authSvc.login, {
      username,
      password,
    });

    yield put(
      loginSuccess({ token: token, user: { username: username, password: '' } })
    );
  } catch (error) {
    // yield put(loginError({ err: error }));
  }
}

function* logoutHandler() {
  try {
    const { data } = yield call(authSvc.logout);

    console.log(data);
    yield put(logoutSuccess());
  } catch (error) {
    // yield put(loginError({ err: error }));
  }
}

export default sagas;
