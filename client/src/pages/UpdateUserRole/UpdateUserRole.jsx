import { useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { useCurrentToken } from "../../Redux/features/auth/authSlice";
import { useUpdateUserInfoMutation } from "../../Redux/features/updateUserInfo/updateUserInfoApi";

const UpdateUserRole = () => {
  const { user } = useLoaderData();
  const [selectedValue, setSelectedValue] = useState(
    user?.role || "unassigned"
  );
  const token = useSelector(useCurrentToken);
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const handleSubmit = async(event) => {
    event.preventDefault();

    const form = event.target;

    // const body = {
    //   _id: user._id,
    //   role: selectedValue,
    // };
    const obj ={
      body:{
        role: selectedValue,
      },userId:user._id
    } 
    const res = await updateUserInfo(obj).unwrap();
    console.log(res);
    if(res.success){
      alert("Successfully updated");
      form.reset();
    }
    else{
      alert("Something went wrong");
    }

    // const url = `http://localhost:5000/users/${user._id}/roles`;
    // fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json",
    //     authorization: token,
    //   },
    //   body: JSON.stringify(body),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.success) {
    //       form.reset();
    //       alert("Successfully role updated");
    //     } else {
    //       alert("Something went wrong");
    //     }
    //   })
    //   .catch(() => {
    //     alert("Something went wrong");
    //   });
  };

  return (
    <div className="m-5  login-container d-flex align-items-center">
      <div className=" border login-content p-10 m-auto ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Select role:
            </label>
            <br />
            <select
              className="border"
              id="role"
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
            Update role
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

export default UpdateUserRole;
