import React, { useState } from 'react';
import { toast } from 'sonner';

const AssignContractorManager = () => {
    const [selectedValue, setSelectedValue] = useState("contractor");


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("hello world");
    
        const form = event.target;
        const fullName = form.fullName.value;
        const userID = form.userID.value;
        const role = form.role.value;
        const emailAddress = form.emailAddress.value;
        const dateOfAccountCreation = form.dateOfAccountCreation.value;
        const contactNumber = form.contactNumber.value;
        const assignedContractorCompany = form.assignedContractorCompany.value;
        const username = form.username.value;
        const password = form.password.value;
        
    
    
        const body = {
            name:fullName,
            userID:parseInt(userID),
            email:emailAddress,
            dateOfAccountCreation,
            contactNumber,
            assignedContractorCompany : parseInt(assignedContractorCompany),
            role,
            username,
            password 
        };
        console.log(body);
    
        fetch("http://localhost:5000/assign/contractor-manager", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(body),
          })
            .then((res) => res.json())
            .then((data) => {
                if(data.success){
                    toast("Successfully assigned",{duration:2000} )
                }
                else{
                  alert("Failed to add!");
                }
            })
            .catch(() => {
              alert("Something went wrong");
            });
    
      
      };
    return (
        <div className="m-5  login-container d-flex align-items-center">
        <div className=" border w-3/4  p-10 m-auto ">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h2 className="text-center text-2xl"> Assign Contractor Manager </h2>
            </div>
  
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name: 
              </label>
              <input
                type="text"
                name="fullName"
                className="form-control border w-full h-8"
                aria-describedby="emailHelp"
                required
              />
            </div>
  
            <div className="mb-3">
                <label htmlFor="userID" className="form-label">
                    User Id:
                </label>
                <input
                    type="Number"
                    name="userID"
                    className="form-control border w-full h-8"
                    aria-describedby="emailHelp"
                    id="capacity"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="emailAddress" className="form-label">
                    Email: 
                </label>
                <input
                    type="Email"
                    name="emailAddress"
                    className="form-control border w-full h-8"
                    aria-describedby="emailHelp"
                    id="capacity"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="dateOfAccountCreation" className="form-label">
                    Date of Account Creation : 
                </label>
                <input
                    type="Date"
                    name="dateOfAccountCreation"
                    className="form-control border w-full h-8"
                    aria-describedby="emailHelp"
                    
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
              <option value="contractor">Contractor</option>
            
            </select>
          </div>
            
            <div className="mb-3">
                <label htmlFor="contactNumber" className="form-label">
                    Contact Number: 
                </label>
                <input
                    type="text"
                    name="contactNumber"
                    className="form-control border w-full h-8"
                    aria-describedby="emailHelp"
                    
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="assignedContractorCompany" className="form-label">
                    Assigned Contractor Company: 
                </label>
                <input
                    type="Number"
                    name="assignedContractorCompany"
                    className="form-control border w-full h-8"
                    aria-describedby="emailHelp"
                    
                    required
                />
            </div>
      
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Username: 
                </label>
                <input
                    type="text"
                    name="username"
                    className="form-control border w-full h-8"
                    aria-describedby="emailHelp"
                    
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                       Password: 
                </label>
                <input
                    type="text"
                    name="password"
                    className="form-control border w-full h-8"
                    aria-describedby="emailHelp"
                    
                    required
                />
            </div>
            
            <div className=' w-full flex justify-center'>
            <button type="submit" className="btn mt-5 btn-outline w-1/2 border ">
                 Assign Contractor Manager 
            </button>

            </div>
            
            <p className="error text-danger">
              {" "}
              <small className="text-danger">{} </small>{" "}
            </p>
          </form>
        </div>
      </div>
    );
};

export default AssignContractorManager;