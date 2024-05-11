import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthProvider";
import Nav from "../pages/Shared/Navbar/Nav";
import { AuthContext } from "../Context/AuthProvider";
import { useCurrentToken } from "../Redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { verifyToken } from "../utilities/verifyToken";
import AdminSidebar from "../Sidebars/AdminSidebar";
import LandfillManagerSidebar from "../Sidebars/LandfillManagerSidebar";
import StsManagerSidebar from "../Sidebars/StsManagerSidebar";
import ContractorSidebar from "../Sidebars/ContractorSidebar";
// import useAdmin from "../hooks/useAdmin";
// import Navbar from "../Pages/Shared/Navbar/Navbar";
// import useDoctor from "../hooks/useDoctor";

const DashboardLayout = () => {
  // const { user } = useContext(AuthContext);

  const token = useSelector(useCurrentToken) ;
  const {role} = verifyToken(token);
  // console.log(user);


  // console.log(user);
  return (
    <div>
      {/* <Navbar></Navbar> */}
      
      <Nav></Nav>
      <div className="w-11/12 mx-auto border">
        <div className="flex md:flex-row flex-col min-h-full   ">
        {(role==="system_admin") && <div
            style={{ minWidth: "250px", minHeight: "60vh" }}
            className="basis-1/4 border p-8 md:w-1/4  "
          >
            <div
              style={{ borderBottom: "1px solid black" }}
              className="mb-2  flex flex-row text-center  "
            ></div>
            <div
              style={{ borderBottom: "1px solid black" }}
              className="mb-2  flex flex-row  "
            >
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive ? " font-bold " : " topic-name text-decoration-none"
                }
              >
                All Users
              </NavLink>
            </div>
            <div
              style={{ borderBottom: "1px solid black" }}
              className="mb-2 flex flex-row  "
            >
              <NavLink
                to="/users/create-user"
                className={({ isActive }) =>
                  isActive ? " font-bold " : " topic-name text-decoration-none"
                }
              >
                Create User{" "}
              </NavLink>
            </div>
            <div
              style={{ borderBottom: "1px solid black" }}
              className="mb-2 flex flex-row  "
            >
              <NavLink
                to="/users/roles"
                className={({ isActive }) =>
                  isActive ? " font-bold " : " topic-name text-decoration-none"
                }
              >
                All Available Roles{" "}
              </NavLink>
            </div>
            {/* 2 Entry Views */}

            <div
              style={{ borderBottom: "1px solid black" }}
              className="mb-2 flex flex-row  "
            >
              <NavLink
                to="/users/vehicle/create"
                className={({ isActive }) =>
                  isActive ? " font-bold " : " topic-name text-decoration-none"
                }
              >
                Create Vehicle
              </NavLink>
            </div>
            <div
              style={{ borderBottom: "1px solid black" }}
              className="mb-2 flex flex-row  "
            >
              <NavLink
                to="/users/sts/create"
                className={({ isActive }) =>
                  isActive ? " font-bold " : " topic-name text-decoration-none"
                }
              >
                Create Sts
              </NavLink>
            </div>
            <div
              style={{ borderBottom: "1px solid black" }}
              className="mb-2 flex flex-row  "
            >
              <NavLink
                to="/users/manager/assign"
                className={({ isActive }) =>
                  isActive ? " font-bold " : " topic-name text-decoration-none"
                }
              >
                Assign STS Manager
              </NavLink>
            </div>
            <div
              style={{ borderBottom: "1px solid black" }}
              className="mb-2 flex flex-row  "
            >
              <NavLink
                to="/users/vehicle/assign"
                className={({ isActive }) =>
                  isActive ? " font-bold " : " topic-name text-decoration-none"
                }
              >
                Assign vehicles
              </NavLink>
            </div>


            <div
              style={{ borderBottom: "1px solid black" }}
              className="mb-2 flex flex-row  "
            >
              <NavLink
                to="/users/landfill/create"
                className={({ isActive }) =>
                  isActive ? " font-bold " : " topic-name text-decoration-none"
                }
              >
                Create Landfill 
              </NavLink>
            </div>



            <div
              style={{ borderBottom: "1px solid black" }}
              className="mb-2 flex flex-row  "
            >
              <NavLink
                to="/users/landfill_manager/assign"
                className={({ isActive }) =>
                  isActive ? " font-bold " : " topic-name text-decoration-none"
                }
              >
                Assign Landfill Manager
              </NavLink>
            </div>

                {/*  Working on final portion */}

            <div
              style={{ borderBottom: "1px solid black" }}
              className="mb-2 flex flex-row  "
            >
              <NavLink
                to="/users/third-party/register"
                className={({ isActive }) =>
                  isActive ? " font-bold " : " topic-name text-decoration-none"
                }
              >
                Register Contractor Company
              </NavLink>
            </div>
            <div
              style={{ borderBottom: "1px solid black" }}
              className="mb-2 flex flex-row  "
            >
              <NavLink
                to="/users/assign/contractor-manager"
                className={({ isActive }) =>
                  isActive ? " font-bold " : " topic-name text-decoration-none"
                }
              >
                Assign Contractor Manager User 
              </NavLink>
            </div>




          </div>}

          { role === "landfill_manager" &&  <LandfillManagerSidebar></LandfillManagerSidebar> }


          { role === "sts_manager" &&  <StsManagerSidebar></StsManagerSidebar> }
          { role === "contractor" &&  <ContractorSidebar></ContractorSidebar> }
          <div className="basis-3/4">
            <Outlet className=" w-100 md:w-3/4"></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
