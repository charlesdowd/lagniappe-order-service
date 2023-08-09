import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../..';
import { logOut, setAcessToken } from '../authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  credentials: 'include', // https://stackoverflow.com/questions/63351799/react-fetch-credentials-include-breaks-my-entire-request-and-i-get-an-error
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    // Set auth header of all requests if user has authToken saved in state
    if (accessToken) headers.set('authorization', `Bearer ${accessToken}`);

    return headers;
  },
});

// The typing here is not the best but it works
async function baseQueryWithReauth(
  args: any,
  api: any,
  extraOptions: any,
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
  let result = await baseQuery(args, api, extraOptions);

  // If error decoding auth credentials, try and use refresh token
  if (result?.error?.status === 403) {
    console.log('Sending refresh token');

    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    // If refresh token works set new access token and retry original request
    if (refreshResult?.data) {
      // Store the new access token
      api.dispatch(setAcessToken(refreshResult.data));

      // Retry original request with new access token
      result = await baseQuery(args, api, extraOptions);
      console.log('Refresh token used successfully');
    } else {
      // TODO: (optional) handle 403 expired refresh differently than other errors

      // Log out user if refresh fails
      api.dispatch(logOut());
      return refreshResult;
    }
  }
  return result;
}

export const templateApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Todo', 'User'],

  // The endpoints are added later, in platformApi.ts, which is generated from
  // the OpenAPI specification by running `npm generate-api`.
  endpoints: () => ({}),
});
