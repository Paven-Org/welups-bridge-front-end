import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { loginAction } from 'app/redux/auth/auth.action';
import { User } from 'app/models/user';

const useMerchant = () => {
  const dispatch = useDispatch();

  const login = useCallback(
    ({ username, password }: User) => {
      dispatch(loginAction({ username, password }));
    },
    [dispatch]
  );

  return {
    login,
  };
};

export default useMerchant;
