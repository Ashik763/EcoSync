const AssignManagerToSts = () => {
  // const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const ward_number = form.ward_number.value;
    const email = form.email.value;

    const body = {
      ward_number,

      email,
    };

    const url = "http://localhost:5000/sts/assign-manager";
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          form.reset();
          alert("Successfully assigned");
        } else {
          alert("Something went wrong");
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
            <h2 className="text-center text-2xl"> Assign Manager</h2>
            <label htmlFor="ward_number" className="form-label">
              Ward Number
            </label>
            <input
              type="Number"
              name="ward_number"
              className="form-control border w-full h-8"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <div className="mb-3">
            <br />
            <br />
            <label htmlFor="email" className="form-label">
              {"Manager's email:"}
            </label>
            <input
              type="email"
              name="email"
              className="form-control border w-full h-8"
              aria-describedby="emailHelp"
              id="email"
              required
            />
            <br />
          </div>

          <button type="submit" className="btn mt-5 btn-outline w-full border ">
            Assign Manager
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

export default AssignManagerToSts;
