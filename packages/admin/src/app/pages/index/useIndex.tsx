import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { loginAction } from "app/redux/auth/auth.action";
import { LoginUser } from "app/models/user";

const useIndex = () => {
  const dispatch = useDispatch();

  const login = useCallback(
    ({ username, password }: LoginUser) => {
      dispatch(loginAction({ username, password }));
    },
    [dispatch]
  );

  return {
    login,
  };
};

export default useIndex;
