import React from 'react';
import { toast } from 'sonner';

const AssignWorkForce = () => {


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("hello world");
    
        const form = event.target;
        const fullName = form.fullName.value;
        const userID = form.userID.value;
        const dateOfBirth = form.dateOfBirth.value;
        const dateOfHire = form.dateOfHire.value;
        const jobTitle = form.jobTitle.value;
        // const paymentRatePerHour = form.userID.value;
        const paymentRatePerHour = form.paymentRatePerHour.value;
        const contactInformation = form.contactInformation.value;
        const assignedCollectionRoute = form.assignedCollectionRoute.value;
        
        
    
    
        const body = {
            fullName,
            employeeID:parseInt(userID),
            dateOfBirth,
            dateOfHire,
            jobTitle,
            paymentRatePerHour,
            contactInformation,
            assignedCollectionRoute
            
        };
        console.log(body);
    
        fetch("http://localhost:5000/assign/work-force", {
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
              <h2 className="text-center text-2xl"> Assign in Work Force </h2>
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
                <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth : 
                </label>
                <input
                    type="Date"
                    name="dateOfBirth"
                    className="form-control border w-full h-8"
                    aria-describedby="emailHelp"
                    
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="dateOfHire" className="form-label">
                    Date of Hire : 
                </label>
                <input
                    type="Date"
                    name="dateOfHire"
                    className="form-control border w-full h-8"
                    aria-describedby="emailHelp"
                    
                    required
                />
            </div>
            
            
            <div className="mb-3">
                <label htmlFor="jobTitle" className="form-label">
                jobTitle: 
                </label>
                <input
                    type="text"
                    name="jobTitle"
                    className="form-control border w-full h-8"
                    aria-describedby="emailHelp"
                    
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="paymentRatePerHour" className="form-label">
                Payment Rate Per Hour: 
                </label>
                <input
                    type="Number"
                    name="paymentRatePerHour"
                    className="form-control border w-full h-8"
                    aria-describedby="emailHelp"
                    
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="contactInformation" className="form-label">
                    Contact Information: 
                </label>
                <input
                    type="text"
                    name="contactInformation"
                    className="form-control border w-full h-8"
                    aria-describedby="emailHelp"
                    
                    required
                />
            </div>


            <div className="mb-3">
                <label htmlFor="assignedCollectionRoute" className="form-label">
                Assigned Collection Route: 
                </label>
                <input
                    type="Number"
                    name="assignedCollectionRoute"
                    className="form-control border w-full h-8"
                    aria-describedby="emailHelp"
                    
                    required
                />
            </div>
      
         
        
            
            <div className=' w-full flex justify-center'>
            <button type="submit" className="btn mt-5 btn-outline w-1/2 border ">
                 Assign in Work Force
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

export default AssignWorkForce;