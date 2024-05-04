// import { useState } from "react";

import { useState } from "react";

// import { AiFillGithub } from "react-icons/ai";
// import { AiOutlineGoogle } from "react-icons/ai";
// import { AuthContext } from "../../Context/AuthProvider";

const CreateUser = () => {
  // const [error, setError] = useState("");
  const [selectedValue, setSelectedValue] = useState("unassigned");
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;

    const email = form.email.value;
    const password = form.password.value;

    const body = {
      name: name,
      email: email,
      password: password,
      role: selectedValue,
    };

    const url = `http://localhost:5000/users`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          form.reset();
          alert("Successfully created");
        } else {
          alert("Something went wrong");
        }
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

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
            Create User
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

export default CreateUser;
