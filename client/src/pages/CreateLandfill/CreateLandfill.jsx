import { useCreateLandfillMutation } from "../../Redux/features/allUsers/allUsersApi";


const CreateLandfill = () => {
    const [createLandfill] = useCreateLandfillMutation();
  

    const handleSubmit = async(event) => {
        event.preventDefault();
    
        const form = event.target;
        const landfill_id = form.landfill_id.value;
        const name = form.name.value;
        const x = form.x.value;
        const y = form.y.value;
        const from = form.from.value;
        const to = form.to.value;
        
    
       
        var startTime = new Date("1970-01-01T" + from + ":00");
        var endTime = new Date("1970-01-01T" + to + ":00");
        const operationalTime = {
            current_date: new Date(),
            from: startTime,
            to: endTime,
        }

        const body = { 
            landfill_id,
            name,
            operational_time:operationalTime, 
            capacity: 100,
            coordinates: {
              x,
              y,
            },
          };
          console.log(body);

          const res  = await createLandfill(body).unwrap();
          console.log(res);
          if(res.success){
            alert("Landfill successfully created");
          }
          else{
            alert("Failed to create landfill");
          }


         

        

        


      
      };
    return (
        <div className="m-5  login-container d-flex align-items-center">
        <div className=" border login-content p-10 m-auto ">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h2 className="text-center text-2xl"> Create Landfill </h2>
        
            </div>

            <div className="mb-3">

            <label htmlFor="landfill_id" className="form-label">
              Landfill ID: 
            </label>
            <input
              type="Number"
              name="landfill_id"
              className="form-control border w-full h-8"
              aria-describedby="emailHelp"
              required
            />
          </div>
  
            <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control border w-full h-8"
              aria-describedby="emailHelp"
              id="name"
              required
            />
            <br />
            <br />
            <label htmlFor="capacity" className="form-label">
              Capacity
            </label>
            <input
              type="Number"
              name="capacity"
              className="form-control border w-full h-8"
              aria-describedby="emailHelp"
              id="capacity"
              required
            />
            <br />
          <h1 className="font-bold  ">Coordinates: </h1>  
            <label htmlFor="x" className="form-label">
              Valueu of X:
            </label>
            <input
              type="Number"
              name="x"
              className="form-control border w-full h-8"
              id="x"
              aria-describedby="emailHelp"
              required
            />
            <label htmlFor="y" className="form-label">
              Valueu of y:
            </label>
            <input
              type="Number"
              name="y"
              className="form-control border w-full h-8"
              id="y"
              aria-describedby="emailHelp"
              required
            />
            </div>
            <div className="mb-3">
            <br />
            <br />
          <h3 className="font-bold "> Operational Timestamp: </h3>
            From: <input type="time" name="from" ></input> <br/>
            To: <input type="time" name="to" ></input>
           
           
           
           
            </div>
  
            <button type="submit" className="btn mt-5 btn-outline w-full border ">
              Create Landfill
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

export default CreateLandfill;