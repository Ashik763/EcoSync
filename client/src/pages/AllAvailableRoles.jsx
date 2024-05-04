import { useLoaderData } from "react-router-dom";

const AllAvailableRoles = () => {
  const { roles } = useLoaderData();
  //   console.log(roles);
  return (
    <div>
      <p className="font-bold text-xl text-center m-2"> All available roles:</p>
      <ul className="p-5">
        {roles.map((role, index) => (
          <li key={role._id}>
            {" "}
            {index + 1}. {role?.role}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllAvailableRoles;
