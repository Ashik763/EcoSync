import React, { useEffect, useState } from 'react';

const AllBills = () => {
    const [bills, setBills] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/all-bills")
        .then(res => res.json())
        .then(data => {
            console.log(data.result);
            setBills(data.result);

        })
    },[])
    return (
        <div>
              <table className="table w-full ">
        <thead>
          <tr>
            <th></th>
            {/* <th>User id</th> */}
            <th>Departure Place(ward no.)</th>
            <th>Passed Path(km)</th>

            <th>Total Fuel Cost(tk)</th>
            <th>Vehicle Number</th>
            <th>Weight of Waste(ton)</th>
            <th>Vehicle Capacity(ton) </th>
            <th>Billing Time</th>
          </tr>
        </thead>
        <tbody>
          {bills?.length ? (
             bills?.map((bill, i) => {
                const date = new Date( bill.createdAt);

                const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const meridiem = hours >= 12 ? 'PM' : 'AM';
const twelveHourFormat = hours % 12 || 12;

const formattedTime = `${twelveHourFormat}:${minutes}:${seconds} ${meridiem}`;
const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

            return  <tr key={bill._id}>
                <th>{i + 1}. </th>
                {/* <td>{user._id}</td> */}
                <td>{bill?.departure_place?.ward_number}</td>
                {/* <td>{booking.doctorName}</td> */}
                <td>{bill.passed_path}</td>
                <td>{bill.total_fuel_cost}</td>
                <td>
                  {
                    bill.vehicle_number
                  }
                </td>
                <td>
                  {
                    bill.weight_of_waste
                  }
                </td>
                <td>
                  {
                    bill.vehicle_capacity
                  }
                </td>
               
                
                <td>
                {/* `{hours}:{minutes}:{seconds}` */}
                at {formattedTime} on {formattedDate}
                </td>
                {/* <td>
                    {booking?.price && !booking.paid && (
                      <Link to={`/dashboard/payment/${booking?._id}`}>
                        <button className="btn btn-primary btn-sm">Pay</button>
                      </Link>
                    )}
                    {booking.price && booking.paid && (
                      <span className="text-green-500">Paid</span>
                    )}
                  </td> */}
              </tr>
            })
          ) : (
            <>
              <span className="text-2xl font-semibold "> No User Yet</span>
            </>
          )}
        </tbody>
      </table>
        </div>
    );
};

export default AllBills;