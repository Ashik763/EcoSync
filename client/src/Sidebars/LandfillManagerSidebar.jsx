import React from 'react';
import { NavLink } from 'react-router-dom';

const LandfillManagerSidebar = () => {
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
            to="/users/add-entry-of-truck"
            className={({ isActive }) =>
              isActive ? " font-bold " : " topic-name text-decoration-none"
            }
          >
           Add Entry of Truck
          </NavLink>
        </div>

        {/* Billing Section */}
        <h1 className='font-bold text 2xl mt-3' >Billings:</h1>
        <div
          style={{ borderBottom: "1px solid black" }}
          className="mb-2 mt-3 flex flex-row  "
        >
          <NavLink
            to="/users/create-a-bill"
            className={({ isActive }) =>
              isActive ? " font-bold " : " topic-name text-decoration-none"
            }
          >
           Make a bill 
          </NavLink>
        </div>


        <div
          style={{ borderBottom: "1px solid black" }}
          className="mb-2 mt-3 flex flex-row  "
        >
          < NavLink
            to="/users/all-bills"
            className={({ isActive }) =>
              isActive ? " font-bold " : " topic-name text-decoration-none"
            }
          >
            All Bills
          </NavLink>
        </div>

     

      </div>
    );
};

export default LandfillManagerSidebar;