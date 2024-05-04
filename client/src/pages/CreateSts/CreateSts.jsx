const CreateSts = () => {
  // const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const ward_number = form.ward_number.value;
    const capacity = form.capacity.value;

    const x = form.x.value;
    const y = form.y.value;

    const body = {
      ward_number,

      capacity: capacity,
      coordinates: {
        x,
        y,
      },
    };

    const url = "http://localhost:5000/sts/create";
    fetch(url, {
      method: "POST",
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
          alert("Successfully created");
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
            <h2 className="text-center text-2xl"> Create STS</h2>
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
            <label htmlFor="capacity" className="form-label">
              Capacity
            </label>
            <input
              type="Number"
              name="capacity"
              className="form-control border w-full h-8"
              aria-describedby="emailHelp"
              id="capacity"
              required
            />
            <br />
            Coordinates:
            <label htmlFor="x" className="form-label">
              Valueu of X:
            </label>
            <input
              type="Number"
              name="x"
              className="form-control border w-full h-8"
              id="x"
              aria-describedby="emailHelp"
              required
            />
            <label htmlFor="y" className="form-label">
              Valueu of y:
            </label>
            <input
              type="Number"
              name="y"
              className="form-control border w-full h-8"
              id="y"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <button type="submit" className="btn mt-5 btn-outline w-full border ">
            Add STS
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

export default CreateSts;
