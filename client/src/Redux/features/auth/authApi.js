import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    getRoleDetails: builder.query({
      query: (userId) => {
        console.log(userId);
        return {
          url: `/users/role-details/${userId}`,
          method: 'GET',

        }
       
      },
    }),
    getStsManagerRoleDetails: builder.query({
      query: (userId) => {
        console.log(userId);
        return {
          url: `/sts-manager/role-details/${userId}`,
          method: 'GET',

        }
       
      },
    })



  }),
});

export const { useLoginMutation, useGetRoleDetailsQuery, useGetStsManagerRoleDetailsQuery } = authApi;
