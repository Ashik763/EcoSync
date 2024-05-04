import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSpecificUserDetailsQuery } from "../../Redux/features/SpecificUserDetails/specificUserDetailsApi";
import Spinner from "../../pages/Shared/Spinner/Spinner";

const SpecificUserDetails = () => {
  const [user, setUser] = useState({});
  
  let { userId } = useParams();


  const {data,isLoading} = useGetSpecificUserDetailsQuery(userId);
  if(isLoading){
    return <Spinner></Spinner>
  }
  // setUser(data?.user);

  return (
    <div>
      <div className="text-center font-bold text-xl mt-2">
        Specific User Details{" "}
      </div>
      <div className="p-10">
        _id: {data?.user?._id}
        <br />
        Name: {data?.user?.name} <br />
        Email: {data?.user?.email} <br />
      </div>
    </div>
  );
};

export default SpecificUserDetails;
