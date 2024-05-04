import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCurrentToken } from "../../Redux/features/auth/authSlice";
import { useChangePasswordMutation } from "../../Redux/features/ChangePassword/changePasswordApi";
import { useUpdateUserInfoMutation } from "../../Redux/features/updateUserInfo/updateUserInfoApi";

const UpdateUserInfo = () => {
  const [user, setUser] = useState({});
  const [selectedValue, setSelectedValue] = useState(
    user?.role || "unassigned"
  );
  const token = useSelector(useCurrentToken);
  let { userId } = useParams();
  console.log(token);
  const [updateUserInfo] = useUpdateUserInfoMutation();


  const handleSubmit =async (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;

    const email = form.email.value;
  

    const body = {
      name: name,
      email: email,
     
      role: selectedValue,
    };
    const obj ={
      body,userId
    } 
    console.log(userId);
    const res = await updateUserInfo(obj).unwrap();
    console.log(res);
    if(res.success){
      alert("Successfully updated");
      form.reset();
    }
    else{
      alert("Something went wrong");
    }

    // const url = `http://localhost:5000/users/${userId}`;

    // fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json",
    //     authorization: token,
    //   },
    //   body: JSON.stringify(body),
    // })
      // .then((res) => res.json())
      // .then((res) => {
      //   console.log(res);
      //   if (res.success) {
      //     form.reset();
      //     alert("Successfully updated");
      //   } else {
      //     alert("Something went wrong");
      //   }
      // })
      // .catch(() => {
      //   alert("Something went wrong");
      // });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user);

        setUser(data.user);
      });
  }, [userId]);
  return (
    <div className="m-5  login-container d-flex align-items-center">
    <div className=" border login-content p-10 m-auto ">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h2 className="text-center text-2xl"> Create User</h2>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={user?.name}
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
            defaultValue={user?.email}
            className="form-control border w-full h-8"
            id="email"
            aria-describedby="emailHelp"
            required
          />
        </div>
        {/* <div className="mb-3">
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
        </div> */}
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Select role:
          </label>
          <br />
          <select
            className="border"
            id="role"
            defaultValue={user?.role}
            value={selectedValue}
            onChange={(event) => setSelectedValue(event.target.value)}
          >
            <option value="system_admin">System Admin</option>
            <option value="sts_manager">Sts Manager</option>
            <option value="landfill_manager">Landfill Manager</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>

        <button type="submit" className="btn mt-5 btn-outline w-full border ">
          Update 
        </button>
        <p className="error text-danger">
          {" "}
          <small className="text-danger">{} </small>{" "}
        </p>
      </form>
    </div>
  </div>
  );
};

export default UpdateUserInfo;
