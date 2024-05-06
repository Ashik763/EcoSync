import { useContext, useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
// import { FcServices } from "react-icons/fc";
import "./Navbar.css";
// import { BsSun } from 'react-icons/bs';
// import { BsMoonStars } from 'react-icons/bs';

import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../../../Redux/features/auth/authSlice";

const Nav = () => {
  const [admins, setAdmins] = useState([]);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  console.log(user);
  // useEffect(() => {
  //   fetch("https://myapp-8k92brsir-ashik763.vercel.app/admins")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAdmins(data);
  //     });
  // }, []);

  // const { user, logOut, userInfoFromDb } = useContext(AuthContext);
  // const email = user?.email;
  // console.log("User from db", userInfoFromDb);
  // (email);
  // (user);
  // const {mood,setMood} = useContext(MoodContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
    
  };


  

  return (
    <div>
      Nav bar
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                {" "}
                <Link to="/">Home</Link>{" "}
              </li>

            
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            EcoSync
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              {" "}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? " active topic-name text-decoration-none"
                    : " topic-name text-decoration-none"
                }
              >
                {" "}
                Home
              </NavLink>{" "}
            </li>
           
            {user ? (
              <>
                <li>
                  {" "}
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? " active topic-name text-decoration-none"
                        : " topic-name text-decoration-none"
                    }
                    to="/auth/change-password"
                  >
                    Change Password
                  </NavLink>{" "}
                </li>
               {user?.role ==="system_admin" && <li>
                  {" "}
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? " active topic-name text-decoration-none"
                        : " topic-name text-decoration-none"
                    }
                    to="/users"
                  >
                    Dashboard
                  </NavLink>{" "}
                </li>}
               {/* {user?.role ==="system_admin" && <li>
                  {" "}
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? " active topic-name text-decoration-none"
                        : " topic-name text-decoration-none"
                    }
                    to="/users"
                  >
                    Dashboard
                  </NavLink>{" "}
                </li>} */}
               {
               user?.role === "landfill_manager" && <li>
                  {" "}
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? " active topic-name text-decoration-none"
                        : " topic-name text-decoration-none"
                    }
                    to="/users/add-entry-of-truck"
                  >
                    Dashboard
                  </NavLink>{" "}
                </li>
                }


                {
                user?.role === "sts_manager" && <li>
                  {" "}
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? " active topic-name text-decoration-none"
                        : " topic-name text-decoration-none"
                    }
                    to="/users/add-entry-of-vehicle"
                  >
                    Dashboard
                  </NavLink>{" "}
                </li>
                }
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <ul>
            <li>
              <span className={"  topic-name text-decoration-none"}>
                <>
                  {user?.id ? (
                    <div className="d-flex align-middle">
                      <div className="flex align-bottom ">
                        <span className="flex my-auto">
                          {
                            user?.name ||
                            user?.uid}
                        </span>
                        <button
                          className="btn btn-outline ms-2"
                          onClick={handleLogOut}
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button className="btn btn-outline">
                        <Link
                          className="topic-name text-decoration-none "
                          to="/auth/login"
                        >
                          Login{" "}
                        </Link>
                      </button>
                    </>
                  )}
                </>
              </span>
            </li>
       
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
