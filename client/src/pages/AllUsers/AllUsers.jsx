// import Spinner from "../Shared/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { auth } from "../../Context/AuthProvider";
// import { getAuth } from "firebase/auth";
import { fetchData } from "../../utilities/fetchDataWithHeader";
import { useSelector } from "react-redux";
import { useCurrentToken } from "../../Redux/features/auth/authSlice";
import { useGetAllUsersQuery } from "../../Redux/features/allUsers/allUsersApi";
import Spinner from "../Shared/Spinner/Spinner";
import { useDeleteUserMutation } from "../../Redux/features/deleteUser/deleteUserApi";
// const admin = require('firebase-admin');
// import { getAuth } from "firebase/auth";
// import Spinner from "../Shared/Spinner/Spinner";

const AllUsers = () => {
  // const [users, setUsers] = useState([]);
  // const [flag, setFlag] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortingOrder, setSortingOrder] = useState("1");
 
  const token = useSelector(useCurrentToken);
  const [deleteUser] = useDeleteUserMutation()
  console.log(token);
  // useEffect(() => {
  //   // console.log("Useeffect");
  //   fetch(
  //     `http://localhost:5000/users?sortField=${sortField}&searchField=${searchField}&sortingOrder=${sortingOrder}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `${token}`,
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data?.users?.length !== 0) {
  //         // refetch();
  //         setUsers(data?.users);
  //       }
  //     });
  // }, [searchField, sortField, sortingOrder]);
  // // useEffect(()=>{
  // const { data, refetch, isLoading } = useQuery({
  //   queryKey: ["allUsers"],
  //   queryFn: async () => {
  //     const result = fetchData(
  //       `http://localhost:5000/users?searchField=${searchField}&sortField=${sortField}&sortingOrder=${sortingOrder}`,token
  //     );
  //     console.log(result);
  //     setUsers(result);
  //     return result;
  //   },
  // });

  // // })

  const handleDelete =async (_id) => {
    console.log("clicked", _id);
  
    const res =  await deleteUser(_id).unwrap();
    console.log(res);
    if(res.acknowledged){
      alert("Successfully Deleted")
    }
    else{
      alert("Something went wrong");
    }
    
  };



  // console.log("All users");
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  const params = {
    sortField: sortField,
    sortingOrder: sortingOrder,
  }
    if(searchField){
      params["searchField"] = searchField;
    }

    const {data,isLoading,error} = useGetAllUsersQuery(params);
    if(isLoading){
      return <Spinner></Spinner>
    }
    // console.log(data?.users);
  return (
    <div>
      <input
        onChange={(e) => setSearchField(e.target.value)}
        type="search"
        name="name"
        id="default-search"
        className="block w-3/4 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search by name ...."
      />

      {/* Sort field */}
      <label htmlFor="sortBy" className="form-label">
        sort by:
      </label>

      <select
        className="border"
        id="sortBy"
        value={sortField}
        onChange={(event) => setSortField(event.target.value)}
      >
        <option value="email">Email</option>
        <option value="name">Name</option>
        <option value="role">Role</option>
        {/* <option value="unassigned">Unassigned</option> */}
      </select>
      <label htmlFor="sortBy" className="form-label">
        sorting order:
      </label>

      <select
        className="border"
        id="sortBy"
        value={sortingOrder}
        onChange={(event) => setSortingOrder(event.target.value)}
      >
        <option value="1">asc</option>
        <option value="-1">desc</option>

        {/* <option value="unassigned">Unassigned</option> */}
      </select>

      <table className="table w-full ">
        <thead>
          <tr>
            <th></th>
            {/* <th>User id</th> */}
            <th>User Name</th>
            <th>Email</th>

            <th>Role</th>
            <th>Details</th>
            <th>update</th>
            <th>update role </th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.length ? (
             data?.users?.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                {/* <td>{user._id}</td> */}
                <td>{user.name}</td>
                {/* <td>{booking.doctorName}</td> */}
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {
                    <Link to={`/users/${user?._id}`}>
                      <button className="btn btn-primary btn-sm">
                        Details
                      </button>
                    </Link>
                  }
                </td>
                <td>
                  {
                    <Link to={`/users/update/${user?._id}`}>
                      <button className="btn btn-primary btn-sm">Update</button>
                    </Link>
                  }
                </td>
                <td>
                  {
                    <Link to={`/users/${user?._id}/roles`}>
                      <button className="btn btn-primary btn-sm">
                        update role{" "}
                      </button>
                    </Link>
                  }
                </td>
                <td>
                  {
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-danger btn-sm"
                    >
                      delete
                    </button>
                  }
                </td>
                {/* <td>
                    {booking?.price && !booking.paid && (
                      <Link to={`/dashboard/payment/${booking?._id}`}>
                        <button className="btn btn-primary btn-sm">Pay</button>
                      </Link>
                    )}
                    {booking.price && booking.paid && (
                      <span className="text-green-500">Paid</span>
                    )}
                  </td> */}
              </tr>
            ))
          ) : (
            <>
              <span className="text-2xl font-semibold "> No User Yet</span>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
