import { useEffect, useState } from "react";

const useToken = (body) => {
  const [token, setToken] = useState("");
  const email2 = body?.email;
  useEffect(() => {
    if (body?.email) {
      fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.token) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
          }
        })
        .catch(() => {
          alert("Something went wrong");
        });
    }
  }, [email2]);
  return [token];
};

export default useToken;
