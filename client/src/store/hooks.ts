import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './index';
import { selectCurrentToken, selectAuth, selectUser } from './slices/authSlice';

// Use these instead of the standard `useDispatch` and `useSelector` hooks.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Return the auth object
export const useAuth = () => {
  return useAppSelector(selectAuth);
};

// Return true if user has auth token in redux store
export const isLoggedIn = () => {
  return !!useAppSelector(selectCurrentToken);
};

// User has verified their email but does not have a password yet
export const isSettingPassword = () => {
  const user = useAppSelector(selectUser);
  return user?.emailVerified && !user?.password;
};

export const isApproved = () => {
  return useAppSelector(selectUser).approved;
};
