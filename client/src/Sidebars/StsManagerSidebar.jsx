import React from 'react';
import { NavLink } from 'react-router-dom';

const StsManagerSidebar = () => {
    return (
        <div
        style={{ minWidth: "250px", minHeight: "60vh" }}
        className="basis-1/4 border p-8 md:w-1/4  "
      >
        <div
          style={{ borderBottom: "1px solid black" }}
          className="mb-2  flex flex-row text-center  "
        ></div>
        
        {/* 2 Entry Views */}


        <div
          style={{ borderBottom: "1px solid black" }}
          className="mb-2 flex flex-row  "
        >
          <NavLink
            to="/users/add-entry-of-vehicle"
            className={({ isActive }) =>
              isActive ? " font-bold " : " topic-name text-decoration-none"
            }
          >
           Add Entry of Vehicle 
          </NavLink>
        </div>
        <div
          style={{ borderBottom: "1px solid black" }}
          className="mb-2 flex flex-row  "
        >
          <NavLink
            to="/users/monitoring-transported-waste-by-contractors"
            className={({ isActive }) =>
              isActive ? " font-bold " : " topic-name text-decoration-none"
            }
          >
           Monitoring Transported Waste by Contractors 
          </NavLink>
        </div>
        <div
          style={{ borderBottom: "1px solid black" }}
          className="mb-2 flex flex-row  "
        >
          <NavLink
            to="/users/bill-generation"
            className={({ isActive }) =>
              isActive ? " font-bold " : " topic-name text-decoration-none"
            }
          >
           Bill Generation 
          </NavLink>
        </div>

     

      </div>
    );
};

export default StsManagerSidebar;