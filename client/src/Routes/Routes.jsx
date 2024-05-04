import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/DashboardLayout";
// import Login from "../pages/Login";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CreateUser from "../pages/CreateUser/CreateUser";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import AllUsers from "../pages/AllUsers/AllUsers";
import SpecificUserDetails from "../pages/SpecificUserDetails/SpecificUserDetails";
import AllAvailableRoles from "../pages/AllAvailableRoles";
import UpdateUserRole from "../pages/UpdateUserRole/UpdateUserRole";
import UpdateUserInfo from "../pages/UpdateUserInfo/UpdateUserInfo";
import CreateVehicle from "../pages/CreateVehicle/CreateVehicle";
import CreateSts from "../pages/CreateSts/CreateSts.jsx";
import AssignManagerToSts from "../pages/AssignManagerToSts/AssignManagerToSts.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import AssignVehicleToSts from "../pages/AssignVehicleToSts/AssignVehicleToSts.jsx";
import CreateLandfill from "../pages/CreateLandfill/CreateLandfill.jsx";
// import AssignManagerToSts from "../pages/AssignManagerToSts/AssignManagerToSts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/auth/login",
    element: <Login></Login>,
  },
  {
    path: "/auth/change-password",
    element:  <PrivateRoute> 
                <ChangePassword></ChangePassword>
              </PrivateRoute> ,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },

  {
    path: "/users",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/users",
        element: <AllUsers> </AllUsers>,
      },
      {
        path: "/users/create-user",
        element: <CreateUser></CreateUser>,
      },
      {
        path: "/users/:userId",
        element: <SpecificUserDetails></SpecificUserDetails>,
      },
      {
        path: "/users/update/:userId",
        element: <UpdateUserInfo></UpdateUserInfo>,
      },
      {
        path: "/users/roles",
        element: <AllAvailableRoles></AllAvailableRoles>,
        loader: () => fetch(`http://localhost:5000/users/roles`),
      },
      {
        path: "/users/:userId/roles",
        element: <UpdateUserRole> </UpdateUserRole>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.userId}`),
      },

      // 2 data entry interface
      {
        path: "/users/vehicle/create",
        element: <CreateVehicle></CreateVehicle>,
      },
      {
        path: "/users/sts/create",
        element: <CreateSts></CreateSts>,
      },
      {
        path: "/users/manager/assign",
        element: <AssignManagerToSts></AssignManagerToSts>,
      },
      {
        path: "/users/vehicle/assign",
        element: <AssignVehicleToSts></AssignVehicleToSts> ,
      },
      {
        path: "/users/landfill/create",
        element: <CreateLandfill></CreateLandfill> ,
      },
    ],
  },
]);

export default router;
