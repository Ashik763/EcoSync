import React from 'react';
import { useAssignVehicleToStsMutation } from '../../Redux/features/allUsers/allUsersApi';

const AssignVehicleToSts = () => {

  const [ assignVehicleToSts ] = useAssignVehicleToStsMutation();

  const handleSubmit = async(event) => {
    event.preventDefault();

    const form = event.target;

    const ward_number = form.ward_number.value;
    const vehicle_number = form.vehicle_number.value;

    const body = {
      vehicle_number,
      ward_number
    };
    const res  = await assignVehicleToSts(body).unwrap();
    console.log(res);
    if(res.acknowledged){
      alert("successfully assigned!");
    }
    else{
      alert("failed to assign");
    }

  }
    return (
        <div className="m-5  login-container d-flex align-items-center">
        <div className=" border login-content p-10 m-auto ">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h2 className="text-center text-2xl"> Assign Vehicle</h2>
              <label htmlFor="ward_number" className="form-label">
                Ward Number
              </label>
              <input
                id="ward_number"
                type="Number"
                name="ward_number"
                className="form-control border w-full h-8"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-3">
              {/* <h2 className="text-center text-2xl"> Assign Vehicle</h2> */}
              <label htmlFor="vehicle_number" className="form-label">
                Vehicle Number
              </label>
              <input
                type="Number"
                name="vehicle_number"
                className="form-control border w-full h-8"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <button type="submit" className="btn mt-5 btn-outline w-full border ">
              Assign 
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

export default AssignVehicleToSts;