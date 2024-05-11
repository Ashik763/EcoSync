import React from 'react';

const BillGeneration = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const weightOfWasteCollected= form.weightOfWasteCollected.value;
        const requiredWaste= form.requiredWaste.value;
        const paymentPerTonnage= form.paymentPerTonnage.value;
        const fineRateForEachTon= form.fineRateForEachTon.value;
       

       
        const wc=parseInt(weightOfWasteCollected);
        const wr =parseInt(requiredWaste);
        const pt =  parseInt(paymentPerTonnage);
        const f = parseInt(fineRateForEachTon);
        // console.log(body);

        const basicPay = wc*pt;
        const deficit = Math.max(0,wr-wc);
        const fine = deficit*f;
        const totalBill = basicPay*-fine;
        const body={
            weightOfWasteCollected:parseInt(weightOfWasteCollected),
            requiredWaste:parseInt(requiredWaste),
            paymentPerTonnage:parseInt(paymentPerTonnage),
            fineRateForEachTon:parseInt(fineRateForEachTon),
            totalBill:parseInt(totalBill)
        }
    
        fetch("http://localhost:5000/bill-by-sts", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.success) {
              form.reset();
              alert("successfully bill has been made!");
            } else {
              alert("Failed to make!");
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
            <label htmlFor="weightOfWasteCollected" className="form-label">
              Weight of Waste collected by the contractor 
            </label>
            <input
              type="Number"
              name="weightOfWasteCollected"
              className="form-control border w-full h-8"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="requiredWaste" className="form-label">
              Required Waste(in tons);
            </label>
            <input
              type="Number"
              name="requiredWaste"
              className="form-control border w-full h-8"
              id="password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="paymentPerTonnage" className="form-label">
              Payment per tonnage(in taka);
            </label>
            <input
              type="Number"
              name="paymentPerTonnage"
              className="form-control border w-full h-8"
              id=""
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fineRateForEachTon" className="form-label">
              Fine rate for each ton of waste not collected:
            </label>
            <input
              type="Number"
              name="fineRateForEachTon"
              className="form-control border w-full h-8"
              id=""
              required
            />
          </div>

          <button type="submit" className="btn mt-5 btn-outline w-full border ">
            Generate Bill
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

export default BillGeneration;