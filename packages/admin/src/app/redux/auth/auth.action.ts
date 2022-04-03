import { createAction } from '@reduxjs/toolkit';

const loginActionName = 'LOGIN';
const logoutActionName = 'LOGOUT';

export const loginAction = createAction<{
  username: string;
  password: string;
}>(loginActionName);

export const logoutAction = createAction(logoutActionName);
