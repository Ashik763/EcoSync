import { baseApi } from "../../api/baseApi";



const allUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => {
        // const params = new URLSearchParams();
        console.log(params);
        return {
            url: '/all_users',
            method: 'GET',
            params
            
        }
  
      },
      providesTags: ["users"],
    }),


    assignVehicleToSts: builder.mutation({
      query: (body) => {
        console.log(body);
        return {

          url: '/assign/vehicle',
          method: 'PUT',
          body
        }
      },
    }),
    
  }),
});

export const { useGetAllUsersQuery,useAssignVehicleToStsMutation } = allUsersApi;
