// import { useState } from "react";

import { useState } from "react";

// import { AiFillGithub } from "react-icons/ai";
// import { AiOutlineGoogle } from "react-icons/ai";
// import { AuthContext } from "../../Context/AuthProvider";

const CreateVehicle = () => {
  // const [error, setError] = useState("");
  const [vehicleType, setVehicleType] = useState("open_truck");
  const [capacity, setCapacity] = useState("3");
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const vehicle_number = form.vehicle_number.value;

    const loaded_fuel_cost_per_kilometer =
      form.unloaded_fuel_cost_per_kilometer.value;
    const unloaded_fuel_cost_per_kilometer =
      form.unloaded_fuel_cost_per_kilometer.value;

    const body = {
      vehicle_number,
      type: vehicleType,
      capacity: capacity,
      loaded_fuel_cost_per_kilometer,
      unloaded_fuel_cost_per_kilometer,
    };

    const url = "http://localhost:5000/vehicle/addVehicle";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
            <h2 className="text-center text-2xl"> Add Vehicle</h2>
            <label htmlFor="vehicle_number" className="form-label">
              Vehicle Registration Number
            </label>
            <input
              type="text"
              name="vehicle_number"
              className="form-control border w-full h-8"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="vehicle_type" className="form-label">
              Vehicle Type
            </label>

            <select
              className="border"
              id="vehicle_type"
              value={vehicleType}
              onChange={(event) => setVehicleType(event.target.value)}
              required
            >
              <option value="open_truck"> open truck</option>
              <option value="dump_truck">dump truck</option>
              <option value="compactor">compactor</option>
              <option value="container_carrier">container carrier</option>
            </select>
            <br />
            <br />
            <label htmlFor="role" className="form-label">
              Capacity
            </label>

            <select
              className="border"
              id="role"
              value={capacity}
              onChange={(event) => setCapacity(event.target.value)}
              required
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="15">15</option>
            </select>
            <br />

            <label
              htmlFor="loaded_fuel_cost_per_kilometer"
              className="form-label"
            >
              Fuel cost per km - fully loaded
            </label>
            <input
              type="text"
              name="loaded_fuel_cost_per_kilometer"
              className="form-control border w-full h-8"
              id="loaded_fuel_cost_per_kilometer"
              aria-describedby="emailHelp"
              required
            />
            <br />
            <label
              htmlFor="unloaded_fuel_cost_per_kilometer"
              className="form-label"
            >
              Fuel cost per km - unloaded
            </label>
            <input
              type="text"
              name="unloaded_fuel_cost_per_kilometer"
              className="form-control border w-full h-8"
              id="unloaded_fuel_cost_per_kilometer"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <button type="submit" className="btn mt-5 btn-outline w-full border ">
            Add Vehicle
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

export default CreateVehicle;
