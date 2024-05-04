// import { baseApi } from '../../api/baseApi';

import { baseApi } from "../../api/baseApi";

const getSpecificUserDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpecificUserDetails: builder.query({
      query: (userId) => ({
        url: `/users/specific/${userId}`,
        method: 'GET',
    
      }),
    }),
  }),
});

export const { useGetSpecificUserDetailsQuery } = getSpecificUserDetailsApi;
