import { LoginUser } from "app/models/user";
import { loginAction, logoutAction } from "app/redux/auth/auth.action";
import { RootState } from "app/redux/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { WELUPS_TOKEN, WELUPS_USERNAME } from '../commons/commons';

const useAuth = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user, accessToken } = useSelector(
    (state: RootState) => state && state.user
  );

  const login = useCallback(
    ({ username, password }: LoginUser) => {
      dispatch(loginAction({ username, password }));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const getUsername = () => {
    return `${user?.username}`;
  };

  return {
    isAuthenticated,
    user,
    accessToken,
    login,
    logout,
    getUsername,
  };
};

export default useAuth;
