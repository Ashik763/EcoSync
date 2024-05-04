// import { baseApi } from '../../api/baseApi';

import { baseApi } from "../../api/baseApi";

const updateUserInfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserInfo: builder.mutation({
      query: ({body,userId}) => {
        console.log(body,userId);
        return {

            url: `/users/${userId}`,
            method: 'PUT',
            body
        }
      },
      invalidatesTags:["users"]
    }),
  }),
});

export const { useUpdateUserInfoMutation } = updateUserInfoApi;;
