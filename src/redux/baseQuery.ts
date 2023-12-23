import { fetchBaseQuery } from  '@reduxjs/toolkit/dist/query';
import { baseURL } from "../configs";
import { BaseQueryApi, BaseQueryArg, BaseQueryExtraOptions } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { logout, setAccessToken } from "./slices/user.slice.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (header: { set: (arg0: string, arg1: string) => void; }, {getState}: any) => {
    const access_token = getState().user.state.accessToken;
    if (access_token) {
      header.set('authorization', `Bearer ${access_token}`);
    }
    return header;
  }
});

export const baseQueryReAuth = async (
  args: BaseQueryArg<any>,
  api: BaseQueryApi,
  extraOptions: BaseQueryExtraOptions<any>
) => {
  let result = await baseQuery(args, api, extraOptions as NonNullable<unknown>);

  if (result?.error?.status === 401) {
    console.log('sending refresh');
    const refreshResult = await fetch(`${baseURL}/auth/refresh`, {
        headers: {
            'authorization': `Bearer ${api.getState().user.state.refreshToken}`
        }
    })
        .then(res => res.json())
        .catch(console.log);

    if (refreshResult.refreshToken) {
      api.dispatch(setAccessToken(refreshResult.accessToken));

      result = await baseQuery(args, api, extraOptions as NonNullable<unknown>);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
