import { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
// import { AiFillGithub } from "react-icons/ai";
// import { AiOutlineGoogle } from "react-icons/ai";
// import { AuthContext } from "../../Context/AuthProvider";

const Register = () => {
  const [error, setError] = useState("");
  const {
    // signInWithGoogle,
    createUser,
    // updateUserProfile,
    setLoading,
    // loading,
    user,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();
  // //();(location);
  // const from = location.state?.from?.pathname || "/";
  // //();(value);
  const handleSubmit = (event) => {
    event.preventDefault();
    // //();(event)
    const form = event.target;
    // console.dir( form[1].files[0] );
    const name = form.name.value;
    // const image = form[1].files[0];
    const email = form.email.value;
    const password = form.password.value;
    const checked = form.checkbox.checked;
    const body = {
      name: name,
      email: email,
      password: password,
    };

    // (name,photoURL, email, password, checked);
    if (checked) {
      console.log(body);

      const url = `http://localhost:5000/users`;
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.success) {
            // const photoURL = imgData.data.url;

            createUser(email, password)
              .then(() => {
                // Signed in

                // const user = userCredential.user;
                setError("");
                form.reset();
                navigate("/");
                setLoading(true);
                // handleUpdateUserProfile(name, photoURL);

                //();("successfull",user);
              })
              .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
                setError(errorMessage);
              });
          } else {
            console.log("Something is wrong");
          }
        });
    } else {
      setError("please accept terms & conditions");
    }
    //();(checked);
  };
  // const handleUpdateUserProfile = (name, photoURL) => {
  //   const profile = {
  //     displayName: name,
  //     photoURL: photoURL,
  //   };

  //   updateUserProfile(profile)
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoading(false);
  //     });
  // };
  // const handleGoogleSignIn = () => {
  //   signInWithGoogle()
  //     .then((result) => {
  //       //();(result);
  //       setError("");

  //       navigate(from, { replace: true });

  //       handleUpdateUserProfile(result.user.name, result.user.photoURL);
  //       // handleUpdateUserProfile(name,photoURL);
  //     })
  //     .catch((err) => {
  //       //();(err);
  //       setError(err.message);
  //     });
  // };

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
  return (
    <div className="m-5  login-container d-flex align-items-center">
      <div className=" border login-content p-10 m-auto ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h2 className="text-center text-2xl"> Register</h2>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control border w-full h-8"
              aria-describedby="emailHelp"
              required
            />

            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control border w-full h-8"
              id="email"
              aria-describedby="emailHelp"
              required
            />
          </div>
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
            <input type="checkbox" name="checkbox" className="me-2" required />
            <label htmlFor="checkbox" className="form-label">
              Accept terms & conditions
            </label>
          </div>

          <button type="submit" className="btn mt-5 btn-outline w-full border ">
            Register
          </button>
          <p className="error text-danger">
            {" "}
            <small className="text-danger">{error} </small>{" "}
          </p>
        </form>
        <p className="text-center mt-3">
          Already have an account?
          <Link className="link" to="/login">
            Log in
          </Link>
        </p>
        {/* <div className=" sign-in-options text-center ">
          <h6>Or you can continue with </h6>
          <p className=" flex justify-center mt-2">
            <span
              onClick={handleGoogleSignIn}
              className="sign-in-option  sign-in-with-google text-5xl"
            >
              <AiOutlineGoogle></AiOutlineGoogle>{" "}
            </span>
            {/* <span className="sign-in-option sign-in-with-github text-5xl"><AiFillGithub></AiFillGithub> </span> */}
        {/* </p> */}
        {/* </div>  */}
      </div>
    </div>
  );
};

export default Register;
