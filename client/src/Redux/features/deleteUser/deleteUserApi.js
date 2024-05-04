import { baseApi } from '../../api/baseApi';

const deleteUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteUser: builder.mutation({
      query: (userId) => {
        return {

          url: `/users/${userId}`,
          method: 'DELETE',
        }
     
      },
      invalidatesTags:["users"],
    }),
  }),
});

export const { useDeleteUserMutation } = deleteUserApi;
