// import { useState } from "react";

// import { AiFillGithub } from "react-icons/ai";
// import { AiOutlineGoogle } from "react-icons/ai";
// import { AuthContext } from "../../Context/AuthProvider";
import { getAuth, updatePassword } from "firebase/auth";
import { useChangePasswordMutation } from "../../Redux/features/ChangePassword/changePasswordApi";
import Nav from "../Shared/Navbar/Nav";

const ChangePassword = () => {
  // const [error, setError] = useState("");
  // const auth = getAuth();
  // const user = auth.currentUser;
  const [changePassword] = useChangePasswordMutation();
 
  // console.log(user);
  const handleSubmit = async(event) => {
    event.preventDefault();

    const form = event.target;

    const password = form.password.value;
    const newPassword = form.newPassword.value;
    // const email = user.email;

    const body = {
      newPassword,
      oldPassword: password,
    };

    // (name,photoURL, email, password, checked);

    const res = await changePassword(body).unwrap();
    console.log(res);
    // const user = verifyToken(res.token.split(' ')[1])
    // console.log(user);
    // const toastId = toast.loading('Logging in');
    // dispatch(setUser({ user: user, token: res.token.split(' ')[1] }));
    // toast.success('Logged in', { id: toastId, duration: 2000 });
    // navigate(`/`);

  
  };

  return (
    <>
    <Nav></Nav>
    <div className="m-5  login-container d-flex align-items-center">
      <div className=" border login-content p-10 m-auto ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control border w-full h-8"
              id="password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              className="form-control border w-full h-8"
              id="newPassword"
              required
            />
          </div>

          <button type="submit" className="btn mt-5 btn-outline w-full border ">
            Change Password
          </button>
          <p className="error text-danger">
            {" "}
            <small className="text-danger">{} </small>{" "}
          </p>
        </form>
      </div>
    </div>
    </>
  );
};

export default ChangePassword;
