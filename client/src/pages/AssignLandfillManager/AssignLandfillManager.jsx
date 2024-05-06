const AssignLandfillManager = () => {
    // const [error, setError] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const form = event.target;
  
      const landfill_id = form.landfill_id.value;
      const email = form.email.value;
  
      const body = {
        landfill_id,
  
        email,
      };
      console.log(body);
  
      const url = "http://localhost:5000/landfill_manager/assign";
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        //   authorization: `${localStorage.getItem("token")}`,
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
              <h2 className="text-center text-2xl"> Assign Landfill Manager</h2>
              <label htmlFor="landfill_id" className="form-label">
                Landfill ID:
              </label>
              <input
                type="Number"
                name="landfill_id"
                className="form-control border w-full h-8"
                aria-describedby="emailHelp"
                required
              />
            </div>
  
            <div className="mb-3">
              <br />
              <br />
              <label htmlFor="email" className="form-label">
                {"User's email:"}
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
              Assign Landfill Manager
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
  
  export default AssignLandfillManager;
  