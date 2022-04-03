import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'app/models/user';

export interface AuthenticationState {
  isAuthenticated: boolean;
  user?: User;
  accessToken?: string;
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  user: undefined,
  accessToken: undefined,
};

const authentication = createSlice({
  name: `authentication`,
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>
    ) => {
      const { user, token } = action.payload;
      state.accessToken = token;
      state.user = user;
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = undefined;
    },
  },
});
export const { loginSuccess, logoutSuccess } = authentication.actions;
export default authentication.reducer;
