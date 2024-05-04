// import { baseApi } from '../../api/baseApi';

import { baseApi } from "../../api/baseApi";

const changePasswordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (body) => ({
        url: '/auth/change-password',
        method: 'PUT',
        body
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = changePasswordApi;;
