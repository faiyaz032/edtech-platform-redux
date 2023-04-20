import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/auth/authSlice';

export default function useAuthCheck() {
  const [authChecked, setAuthChecked] = useState(false);

  const dispatch = useDispatch();

  //check if auth exists in localStorage if exists then update the local state
  useEffect(() => {
    const localStorageAuth = localStorage?.getItem('auth');
    if (localStorageAuth) {
      const auth = JSON.parse(localStorageAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(userLoggedIn(auth));
      }
    }

    setAuthChecked(true);
  }, [dispatch]);

  return authChecked;
}
