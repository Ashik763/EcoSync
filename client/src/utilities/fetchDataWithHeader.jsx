

export const fetchData = async (url,token) => {
  // const token = useSelector(useCurrentToken);

  const response = await fetch(url, {
    headers: {
      Authorization: `${token}`, // Include your token type (e.g., Bearer)
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  console.log(data.users);
  return data.users;
};
