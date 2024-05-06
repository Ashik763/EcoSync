import { useSelector } from "react-redux";
import { useGetRoleDetailsQuery } from "../../Redux/features/auth/authApi";
import { selectCurrentUser } from "../../Redux/features/auth/authSlice";


const AddEntryOfTruck = () => {
  // const [createLandfill] = useCreateLandfillMutation();
  const {id} =  useSelector(selectCurrentUser);

  const {data} =  useGetRoleDetailsQuery(id);

  

  // console.log(user);

  // const [] = useGetRoleDetailsQuery()

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log();

    const form = event.target;
    
   const vehicle_number = form.vehicle_number.value;
   const weight_of_waste = form.weight_of_waste.value;
   const ta = form.time_of_arrival.value;
   const td = form.time_of_departure.value;


    const time_of_arrival = new Date("1970-01-01T" + ta + ":00");
    const time_of_departure = new Date("1970-01-01T" + td + ":00");
    // const res = getRoleDetails(user?.id);
    // console.log(res);

    const body = {
      landfill_id: data?.result?.landfill_id,
      vehicle_number,
      weight_of_waste,
      time_of_departure,
      time_of_arrival   
    };
    console.log(body);

    fetch("http://localhost:5000/dumping-truck/entry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
            if(data.success){
              alert("successfully added!");
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
      <div className=" border login-content p-10 m-auto ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h2 className="text-center text-2xl"> Create Landfill </h2>
          </div>

          <div className="mb-3">
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

          <div className="mb-3">
          <label htmlFor="weight_of_waste" className="form-label">
          Weight of waste:
            </label>
            <input
              type="Number"
              name="weight_of_waste"
              className="form-control border w-full h-8"
              aria-describedby="emailHelp"
              id="capacity"
              required
            />
          </div>
          <div className="mb-3">
         
            <h3 className="font-bold "> Timestamp: </h3>
            Time of arrival : <input type="time" name="time_of_arrival"></input> <br />
            Time of departure : <input type="time" name="time_of_departure"></input>
          </div>

          <button type="submit" className="btn mt-5 btn-outline w-full border ">
               Add  Entry of Truck
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

export default AddEntryOfTruck;
