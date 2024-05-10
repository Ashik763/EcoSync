import React, { useEffect } from "react";
import { useState } from "react";
import GraphVisualization from "../GraphVisualization/GraphVisualization";
import { selectCurrentUser } from "../../Redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useGetRoleDetailsQuery } from "../../Redux/features/auth/authApi";


const CreateBill = () => {
  const [vehicleNumber, setVehicleNumber] = useState(0);
  const [info, setInfo] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [edges, setEdges] = useState([]);
  const [shortestRoute, setShortestRoute] = useState("");
  const [shortestRouteCost, setShortestRouteCost] = useState(0);
  const { id } = useSelector(selectCurrentUser);

  console.log(id);
  const { data } = useGetRoleDetailsQuery(id);
  console.log(data);

  let sourceNodeId;
  let targetNodeId = 19;
  useEffect(() => {
    fetch(`http://localhost:5000/coordinates-and-edges`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCoordinates(data.coordinates);
        setEdges(data.edges);
      });
  }, []);

  console.log(vehicleNumber);
  useEffect(() => {
    if (vehicleNumber) {
      fetch(`http://localhost:5000/get-sts-info/${vehicleNumber}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setInfo(data?.result);
        });
    }
  }, [vehicleNumber]);

  if (Object.keys(info).length > 0) {
    const { stsInfo, vehicleInfo } = info;
    const departureSts = stsInfo.filter((sts) =>
      sts.vehicle_number.includes(parseInt(vehicleNumber))
    );
    console.log(departureSts);
    sourceNodeId = departureSts[0].ward_number;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { stsInfo, vehicleInfo } = info;

    const departureSts = stsInfo.filter((sts) =>
      sts.vehicle_number.includes(parseInt(vehicleNumber))
    );
    const { capacity, ward_number, coordinates } = departureSts[0];
    sourceNodeId = departureSts[0].ward_number;
    sourceNodeId = data?.result?.landfill_id;

    const form = event.target;

    const vehicle_number = form.vehicle_number.value;
    const weight_of_waste = form.weight_of_waste.value;
    const ta = form.time_of_arrival.value;
    const td = form.time_of_departure.value;
    const total_passed_path = parseInt(shortestRouteCost);

    const time_of_arrival = new Date("1970-01-01T" + ta + ":00");
    const time_of_departure = new Date("1970-01-01T" + td + ":00");

    const body = {
     
      total_fuel_cost:
        total_passed_path *
        (vehicleInfo.unloaded_fuel_cost_per_kilometer +
         ( parseInt(weight_of_waste) / vehicleInfo.capacity) * (vehicleInfo.loaded_fuel_cost_per_kilometer-vehicleInfo.unloaded_fuel_cost_per_kilometer) ),
      passed_path: total_passed_path,
      vehicle_number: parseInt(vehicle_number),
      vehicle_capacity: vehicleInfo.capacity,
      weight_of_waste: parseInt(weight_of_waste),
      time_of_departure: time_of_departure,
      time_of_arrival: time_of_arrival,
      departure_place: {
        sts_capacity:capacity,
        ward_number,
        coordinates,
      },
      destination_place: {
        destination_name: data?.result?.name,
        landfill_id: data?.result?.landfill_id,
  
      }
    };
    console.log(body);

    fetch("http://localhost:5000/bill/entry", {
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
    <div className="flex-col md:flex md:flex-row justify-between">
      {/*   Form */}
      <div className="m-5  login-container d-flex align-items-center">
        <div className=" border login-content p-10 m-auto ">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h2 className="text-center text-2xl"> Make a bill </h2>
            </div>

            <div className="mb-3">
              <label htmlFor="vehicle_number" className="form-label">
                Vehicle Number
              </label>
              <input
                type="Number"
                name="vehicle_number"
                onBlur={(e) => setVehicleNumber(e.target.value)}
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
              Time of arrival :{" "}
              <input type="time" name="time_of_arrival"></input> <br />
              Time of departure :{" "}
              <input type="time" name="time_of_departure"></input>
            </div>

            <button
              type="submit"
              className="btn mt-5 btn-outline w-full border "
            >
              Add Entry of Vehicle
            </button>
            <p className="error text-danger">
              {" "}
              <small className="text-danger">{} </small>{" "}
            </p>
          </form>
        </div>
      </div>

      {/* Graph Section */}
      <div className="border flex-auto">
        {vehicleNumber &&
          `Shortest Route from ward_number${sourceNodeId} to ${data?.result?.name}`}
        {vehicleNumber && (
          <GraphVisualization
            coordinates={coordinates}
            edges={edges}
            sourceNodeId={sourceNodeId}
            targetNodeId={targetNodeId}
            setShortestRoute={setShortestRoute}
            setShortestRouteCost={setShortestRouteCost}
            shortestRoute={shortestRoute}
            shortestRouteCost={shortestRouteCost}
          />
        )}
      </div>
    </div>
  );
};

export default CreateBill;
