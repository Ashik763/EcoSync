import React from 'react';

const MonitoringTransportedWasteByContractors = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const form = event.target;
    
        // const name = form.name.value;
        const ta = form.timeOfarrival.value;
        const timeOfArrival = new Date("1970-01-01T" + ta + ":00");
        const amountOfWaste = form.amountOfWaste.value;
        const contractorId = form.contractorId.value;
        const designatedStsWardNo = form.designatedStsWardNo.value;
        const vehicleNumber = form.vehicleNumber.value;
        const body = {
            timeOfArrival:timeOfArrival,
            amountOfWaste:parseInt(amountOfWaste),
            contractorId: parseInt(contractorId),
            designatedStsWardNo:parseInt(designatedStsWardNo),
            vehicleNumber:parseInt(vehicleNumber)
        };
        console.log(body);
       
        
    
        // const body = {
        //   name: name,
        //   email: email,
        //   password: password,
        //   role: selectedValue
        // };
    
        const url = `http://localhost:5000/monitoring-transported-waste-by-contractors`;
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
              alert("Successfully added");
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
            
                
                Time and Date of Collection:  <input
                 type="time"
                 className="form-control border w-full h-8"
                 name="timeOfarrival"></input> <br />
            
            </div>

            <div className="mb-3">
            
          
                Amount of Waste:  <input 
                type="Number"
                className="form-control border w-full h-8"
                 name="amountOfWaste"></input> <br />
        
            </div>

            <div className="mb-3">
            
          
                Contractor ID:  <input type="Number"
                 name="contractorId"
                 className="form-control border w-full h-8"
                 ></input> <br />
    
            </div>
            <div className="mb-3">
            
          
                Designated Sts Ward no. :  <input
                 type="Number"
                  name="designatedStsWardNo"
                  className="form-control border w-full h-8"
                  ></input> <br />
    
            </div>
            <div className="mb-3">
            
          
                Vehicle Number :  <input type="Number"
                 name="vehicleNumber"
                 className="form-control border w-full h-8"
                 ></input> <br />
    
            </div>
        

          <button type="submit" className="btn mt-5 btn-outline w-full border ">
            Add Entry
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

export default MonitoringTransportedWasteByContractors;