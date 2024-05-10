import React, { useState } from 'react';
import { toast } from 'sonner';

const RegisterContractorCompany = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        contractID: '',
        registrationID: '',
        registrationDate: '',
        TIN: '',
        contactNumber: '',
        workforceSize: 0,
        paymentPerTonnage: 0,
        requiredAmountPerDay: 0,
        contractDuration: 0,
        areaOfCollection: '',
        designatedSTS: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
       fetch("http://localhost:5000/create/contractorComapany",{
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })

       .then((res) => res.json())
       .then((data) =>{
        if(data.success){
            toast.success('The Contractor Company is successfully registered! ', { id: 123, duration: 2000 })
        }
        else{
            alert("something went wrong!")
        }
       })
    
      };
    return (
        <div>
            <h1 className="font-bold text-center text-2xl mt-2"> Register Contractor Company</h1>
         <div className='m-5'>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="companyName"  className="form-label  "  >Company Name:</label>
                <input
                type="text"
                id="companyName"
                name="companyName"
                    value={formData.companyName}
                    className="form-control border w-3/4 h-8 p-1"
                    
                    onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="contractID">Contract ID:</label>
                <input type="text"
                id="contractID"
                name="contractID"
                value={formData.contractID}
                className="form-control border w-full h-8"
                
                onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="registrationID">Registration ID:</label>
                <input type="text"
                id="registrationID"
                name="registrationID"
                value={formData.registrationID}
                className="form-control border w-full h-8"
                    onChange={handleChange}
                    
                    required />
            </div>
            <div>
                <label htmlFor="registrationDate">Registration Date:</label>
                <input type="date"
                id="registrationDate"
                name="registrationDate"
                value={formData.registrationDate}
                className="form-control border w-full h-8"
                    onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="TIN">TIN:</label>
                <input type="text"
                id="TIN" name="TIN"
                value={formData.TIN} 
                className="form-control border w-full h-8"
                onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="contactNumber">Contact Number:</label>
                <input type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                className="form-control border w-full h-8"
                
                onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="workforceSize">Workforce Size:</label>
                <input type="number"
                id="workforceSize"
                name="workforceSize"
                className="form-control border w-full h-8"
                
                value={formData.workforceSize} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="paymentPerTonnage">Payment Per Tonnage:</label>
                <input type="number"
                id="paymentPerTonnage"
                name="paymentPerTonnage"
                value={formData.paymentPerTonnage}
                className="form-control border w-full h-8"
                
                onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="requiredAmountPerDay">Required Amount Per Day:</label>
                <input type="number"
                id="requiredAmountPerDay"
                name="requiredAmountPerDay"
                value={formData.requiredAmountPerDay}
                className="form-control border w-full h-8"
                onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="contractDuration">Contract Duration:</label>
                <input type="number"
                id="contractDuration"
                name="contractDuration"
                value={formData.contractDuration}
                className="form-control border w-full h-8"
                onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="areaOfCollection">Area of Collection:</label>
                <input type="text"  id="areaOfCollection"    className="form-control border w-full h-8 mb-2" name="areaOfCollection" value={formData.areaOfCollection} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="designatedSTS">Designated STS:</label>
                <input type="number" className="form-control border w-full h-8 mb-2" id="designatedSTS" name="designatedSTS" value={formData.designatedSTS} onChange={handleChange} required />
            </div>
            <div className='w-full flex justify-center'>

                 <button type="submit" className="btn mt-5 btn-outline mx-auto border w-1/4 "> Register</button>
            </div>
            </form>
        </div>
            
        </div>
    );
};

export default RegisterContractorCompany;