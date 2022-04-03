/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from '@reduxjs/toolkit';
import user from './auth/auth.slice';

const appReducer = combineReducers({
  user: user,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const rootReducer = (state: any, action: any) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'LOGOUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
