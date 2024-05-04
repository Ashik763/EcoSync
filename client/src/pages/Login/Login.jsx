import { useState } from "react";
// import ReactSpinner from 'react-bootstrap-spinner'
import "./Login.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { getUserInfo, updateFirstTimeLogin } from "../../utilities/getUserInfo";
import { useLoginMutation } from "../../Redux/features/auth/authApi";
import { setUser, useCurrentToken } from "../../Redux/features/auth/authSlice";
import { verifyToken } from "../../utilities/verifyToken";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
// import { useState } from "react";
// import useToken from "../../hooks/useToken";
// import { AiOutlineGoogle, AiFillGithub } from "react-icons/ai";
// import Spinner from "../../Shared/Spinner";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token =  dispatch(useCurrentToken);
  const location = useLocation();
  const [error,setError] = useState("");
 console.log(token);
  const from = location.state?.from?.pathname || "/";
  if (token) {
    navigate(from, { replace: true });
  }

  // const handleFirstTimeLogin = (email, password) => {
  //   updateFirstTimeLogin(email)
  //     .then(() => {
  //       setLoading(false);
  //       fetch("http://localhost:5000/auth/login", {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify({ email, password }),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           if (data.token) {
  //             localStorage.setItem("token", data.token);
  //             navigate(from, { replace: true });
  //             // setToken(data.token);
  //           }
  //         })
  //         .catch(() => {
  //           alert("Something went wrong");
  //         });
  //     })
  //     .catch(() => {
  //       // console.error(error);
  //       setLoading(false);
  //     });
  // };

  // Sign in with Email and password
  const handleSubmit = async(event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    
       
       
          const res = await login({email,password}).unwrap();
          console.log(res);
          if(res.status === "failed" ){
            setError(res.message);
            // toast.error(res.message, { id: toastId, duration: 2000 });
            
          }
          else{
       
            const user = verifyToken(res.token.split(' ')[1])
            console.log(user);
            const toastId = toast.loading('Logging in');
            dispatch(setUser({ user: user, token: res.token.split(' ')[1] }));
            toast.success('Logged in', { id: toastId, duration: 2000 });
            navigate(`/`);

          }
       
      
     
  };

  return (
    <div className=" login-container flex align-center">
      <div className="  login-content border p-10 m-auto ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h2 className="text-center text-2xl"> Log In</h2>
            <label htmlFor="email" className="form-label">
              Email address:
            </label>
            <input
              type="email"
              name="email"
              className="form-control border w-full h-8"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control border w-full h-8"
              id="password"
            />
          </div>

          <button type="submit" className="btn mt-5 btn-outline w-full border ">
            Login
          </button>
        </form>
        <div className="text  text-red-600">{error}</div>

      </div>
    </div>
  );
};

export default Login;
