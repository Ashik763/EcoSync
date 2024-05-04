export const getUserInfo = async (email) => {
  // let result;
  return fetch(`http://localhost:5000/users/email/${email}`);
  // .then((res) => res.json())
  // .then((data) => {
  //   result = data;
  // });
  // console.log(result);
  // return result;
};

export const updateFirstTimeLogin = (email) => {
  return fetch(`http://localhost:5000/users/email/${email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ firstTimeLogin: false }),
  });
};
