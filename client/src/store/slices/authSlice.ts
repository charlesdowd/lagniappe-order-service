import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';
import { templateApi } from './api/templateApi.generated';

export interface IUser {
  _id: string;
  email: string;
  emailVerified?: boolean;
  password?: string;
  emailToken?: string; // Randomized token used to verify email on register
  admin?: boolean;
  approved?: boolean;
  company?: string;
  phoneNumber?: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    user: null,
  },
  reducers: {
    //  Used on login
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.user = user;
    },
    // Used when accessToken is stale and we use our refresh token
    setAcessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
  // Automatically update state after these endpoints are fulfilled
  extraReducers: (builder) => {
    builder.addMatcher(
      templateApi.endpoints.verifyEmail.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        toast.success('Email verified');
      },
    );

    builder.addMatcher(
      templateApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.user = payload.user;
        toast.success('Welcome Back!');
      },
    );

    builder.addMatcher(
      templateApi.endpoints.forgotPassword.matchFulfilled,
      (state, { payload }) => {
        toast.success(payload.message);
      },
    );

    builder.addMatcher(
      templateApi.endpoints.resetPassword.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
      },
    );

    // Update user in redux store with most up to date user info
    builder.addMatcher(
      templateApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
      },
    );

    // Clear auth state on successful logout
    builder.addMatcher(
      templateApi.endpoints.sendLogout.matchFulfilled,
      (state) => {
        state.accessToken = null;
        state.user = null;
      },
    );

    builder.addMatcher(templateApi.endpoints.register.matchFulfilled, () => {
      toast.success('Verification email sent');
    });

    // Fire error toasts when these fail
    builder.addMatcher(
      templateApi.endpoints.login.matchRejected,
      (state, { payload }) => {
        // TODO: find better way to deal with types here
        const errorMessage =
          (payload as any)?.data?.error || 'Internal Server Error';
        toast.error(`Login Failed: ${errorMessage}`);
      },
    );

    builder.addMatcher(
      templateApi.endpoints.verifyEmail.matchRejected,
      (state, { payload }) => {
        // TODO: find better way to deal with types here
        const errorMessage = (payload as any)?.data?.error;
        toast.error(`Error verifying email: ${errorMessage}`);
      },
    );

    builder.addMatcher(
      templateApi.endpoints.register.matchRejected,
      (state, { payload }) => {
        // TODO: find better way to deal with types here
        const errorMessage = (payload as any)?.data?.error;
        toast.error(`Error: ${errorMessage}`);
      },
    );

    builder.addMatcher(
      templateApi.endpoints.forgotPassword.matchRejected,
      (state, { payload }) => {
        // TODO: find better way to deal with types here
        const errorMessage = (payload as any)?.data?.error;
        toast.error(`Error: ${errorMessage}`);
      },
    );

    // Essentially log the user out if refresh fails
    builder.addMatcher(
      templateApi.endpoints.getAuthRefresh.matchRejected,
      (state) => {
        state.accessToken = null;
        state.user = null;
      },
    );
  },
});

// Function for grabbing current auth state
export const selectAuth = (state) => state.auth;
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectUser = (state): IUser => state.auth.user;

// Functions for executing actions on the Auth state
export const { setCredentials, setAcessToken, logOut, setUser } =
  authSlice.actions;

export default authSlice.reducer;
