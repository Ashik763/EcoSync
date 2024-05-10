const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// const admin = require("firebase-admin");

// admin.initializeApp({
//   credential: admin.credential.cert("firebase-adminsdk-qwbqe@eco-sync123.iam.gserviceaccount.com"),
//   databaseURL: "YOUR_DATABASE_URL"
// });

// models
const Coords = require("./models");
const Role = require("./models/role.model");
const User = require("./models/user.model");
const Vehicle = require("./models/vehicle.model");
const Sts = require("./models/sts.model");
const vehicleEntry = require("./models/vehicleEntry.model");
const DumpingTruckEntry = require("./models/dumpingTruckEntry.model");
const Landfill = require("./models/landfill.model");
const Coordinate = require("./models/coordinates.model");
const Edge = require("./models/edge.model");
const Billing = require("./models/billing.model");
const ContractorCompany = require("./models/contractorCompany.model");
const ContractorManager = require("./models/contractorManager.model");
const WorkForce = require("./models/workForce.model");
const Wastage = require("./models/addEntryOfWasteToSts.model");

// middlewares
const verifyStsManager = require("./middlewares/verifyStsManager");
const verifyLandfillManager = require("./middlewares/verifyLandfillManager");
const verifyAdmin = require("./middlewares/verifyAdmin");
const verifyAdminOrOwn = require("./middlewares/verifyAdminOrOwn");
// const { parse } = require("dotenv");




// const verifyJWT = require("./middlewares/verifyJWT");




const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
const dbUrl = `mongodb+srv://root:root@cluster0.bwyg3np.mongodb.net/second-phase?retryWrites=true&w=majority`;

// DB Connection
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
    process.exit();
  });

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(bodyParser.json());

// const verifyAdmin = async (req, res, next) => {
//   const decodedEmail = req.decoded.email;
//   const query = { email: decodedEmail };
//   const user = await User.findOne(query);
//   // console.log(user.name, user.email);
//   if (user?.role !== "system_admin") {
//     // console.log("vitore");
//     return res.status(403).send({ message: "forbidden access" });
//   }
//   next();
// };

// const verifyAdminOrOwn = async (req, res, next) => {
//   const decodedEmail = req.decoded.email;
//   const query = { email: decodedEmail };
//   const user = await User.findOne(query);
//   // console.log(user.name, user.email);
//   if (user?.role === "system_admin") {
//     // console.log("vitore");
//     // return res.status(403).send({ message: "forbidden access" });
//     next();
//   } else if (req.params.userId === user.id) {
//     next();
//   } else {
//     return res.status(403).send({ message: "forbidden access" });
//   }
// };

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const token = authHeader;
  // console.log("toku",token);

  jwt.verify(token, "secret", function (err, decoded) {
    
    if (err) {
      console.log("Error er moddhe");
      return res
        .status(403)
        .send({ success: false, message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

//login
const errorMessage = {
  success: false,
  message: "Something went wrong",
};
app.post("/auth/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("body", req.body);

  // Find user by email
  User.findOne({ email , role: { $ne : "unassigned"} }).then((user) => {
    // Check for user
    const error = {};
    if (!user) {
      error["message"] = "User not found";
      error["status"] = "failed";
      return res.status(200).json(error);
    }

    // Check Password
    // bcrypt.compare(password, user.password).then(isMatch => {
    if (user.password === password) {
      const payload = {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user._id,
      }; // Create JWT Payload
   
      // Sign Token
      jwt.sign(payload, "secret", { expiresIn: 36000 }, (err, token) => {
        res.cookie('token', token, {
          secure: false,
          httpOnly: true,
          sameSite: 'none',
          maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        res.json({
          success: true,
          token: "Bearer " + token,
        });
      });
    } else {
      error["message"] = "Password incorrect";
      error["status"] = "failed";
      return res.status(200).json(error);
    }
    // });
  });
});

app.put("/auth/change-password", verifyJWT, (req, res) => {
  // const email = req.body.email;
  // const password = req.body.password;
  // console.log("body", req.body);
  console.log("Decode er baccha", req.decoded);
  const { oldPassword, newPassword } = req.body;
  const { email } = req.decoded;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    // bcrypt.compare(password, user.password).then(isMatch => {
    console.log(user.password, " ", oldPassword);
    if (user.password === oldPassword) {
      const payload = {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user._id,
      }; // Create JWT Payload

      // Sign Token
      try {
        jwt.sign(
          payload,
          "secret",
          { expiresIn: 36000 },
          async (err, token) => {
            const result = await User.updateOne(
              { email },
              { password: newPassword }
            );
            if (result) {
              res.cookie('token', token, {
                secure: false,
                httpOnly: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 * 365,
              });
              return res.status(200).json({
                success: true,
                user: result,
                token: "Bearer " + token,
              });
            } else {
              return res.status(400).json({ success: false, errors });
            }
          }
        );
      } catch (err) {
        return res.status(400).json({ success: false, err });
      }
    } else {
      // errors.password = "Password incorrect";
      return res
        .status(400)
        .json({ success: false, err: "Password incorrect" });
    }
    // });
  });
});

// Get method for listing all users
app.get("/all_users", verifyJWT, verifyAdmin, async (req, res) => {
  console.log(req.headers.authorization);
  const {
    searchField = "",
    sortField = "email",
    sortingOrder = "-1",
  } = req.query;
  console.log("searchField ", searchField, "sortField ", sortField, "sortingOrder ",parseInt(sortingOrder) );
  let query = {};
  if(searchField){
     query = {
      name: { $regex: new RegExp(searchField, "i") },
    };

  }
  
  try {
    // const result = await User.find(query)
    //   .sort({ sortField: parseInt(sortingOrder) })
    //   .select({ password: 0 });
    const result = await User.aggregate( 
      
      [
        {$match : query},
        {
          $sort: {[sortField]:parseInt(sortingOrder)}
        }
      ]
    )
      console.log(result);
    res.status(200).json({ success: true, users: result });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});

app.get("/users/roles", async (req, res) => {
  // console.log("Clicked");

  try {
    const result = await Role.find({});
    // const result = await roleModel
    res.status(200).json({ success: true, roles: result });
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET method for retrieving a specific user's details
app.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await User.findOne({ _id: userId }).select({ password: 0 });
    res.status(200).json({ success: true, user: result });
  } catch (err) {
    res.status(400).send(err);
  }
});
app.get("/users/specific/:userId", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await User.findOne({ _id: userId }).select({ password: 0 });
    res.status(200).json({ success: true, user: result });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/users/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    const result = await User.findOne({ email });
    
    res.status(200).json({ success: true, user: result });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});

app.put("/users/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const body = req.body;
    console.log(body);
    const result = await User.updateOne({ email }, body);
    res.status(200).json({ success: true, user: result });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});

// create user
app.post(
  "/users",
  // verifyJWT,
  //  verifyAdmin,
  async (req, res) => {
    try {
      // console.log(req.body);
      const result = await User.create(req.body);
      res.status(201).send({
        success: true,
        ...result,
      });
    } catch (err) {
      console.log("In the wrong");
      res.status(400).send({});
    }
  }
);

// PUT method for updating a user's details (restricted to own details or System Admin access).

app.put("/users/:userId", verifyJWT, verifyAdminOrOwn, async (req, res) => {
  console.log("hello");
  try {
    const userId = req.params.userId;
    console.log(userId);
    const updatedInfo = req.body;

    const result = await User.updateOne({ _id: userId }, updatedInfo);
    res.status(200).json({success:true, message:result});
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put(
  "/users/:userId/roles",
  verifyJWT,
  verifyAdmin,

  async (req, res) => {
    try {
      console.log(req.headers.authorization);
      console.log(req.body);
      console.log(req.params.userId);
      const userId = req.params.userId;
      const { role } = req.body;

      const result = await User.updateOne({ _id: userId }, { role: role });
      res.status(200).json({ success: true, result });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// Delete a user
app.delete("/users/:userId", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;

    const result = await User.deleteOne({ _id: userId });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});


// update role of a user
app.put("/users/:userId/roles", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedInfo = req.body;

    const result = await User.updateOne({ _id: userId }, updatedInfo);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get logged in user profile
app.get("/profile", verifyJWT, async (req, res) => {
  try {
    // const userId = req.params.userId;
    console.log(req.decoded);
    const { id } = req.decoded;
    const result = await User.findOne({ _id: id }).select({ profile: 1 });
    res.status(200).json({ profile: result });
  } catch (err) {
    res.status(400).send(err);
  }
});

// update profile
app.put("/profile", verifyJWT, async (req, res) => {
  try {
    const updatedInfo = req.body;
    const { id } = req.decoded;
    const modifiedUpdatedData = {};
    for (const [key, value] of Object.entries(updatedInfo)) {
      modifiedUpdatedData[`profile.${key}`] = value;
    }

    const result = await User.updateOne({ _id: id }, modifiedUpdatedData);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// 2 Data entry interface
// create Vehicle
app.post("/vehicle/addVehicle", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    const vehicle = req.body;
    console.log(vehicle);
    const result = await Vehicle.create(vehicle);
    res.status(201).send({ success: true, result });
  } catch (err) {
    res.status(400).send({ success: false, err });
  }
});

// create STS
app.post("/sts/create", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    // console.log(req.body);
    const result = await Sts.create(req.body);
    res.status(201).send({ success: true, result });
  } catch (err) {
    res.status(400).send(err);
  }
});

// assigning sts manager to a specific sts
app.put("/sts/assign-manager",
 verifyJWT,
  verifyAdmin, async (req, res) => {
  try {
    const { email, ward_number } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          role: "sts_manager",
        },
      }
    );
    if (!user) {
      return res.status(400).send(err);
    }
    const result = await Sts.updateOne(
      { ward_number: ward_number },
      {
        $addToSet: {
          userId: user._id,
        },
        // userId: user._id,
      },
      { upsert: true }
    );
    console.log(user);
    res.status(201).send({ success: true, result });
  } catch (err) {
    console.log("bad req");
    res.status(400).send(err);
  }
});

// Entry of vehicle with STS ID, vehicle number, volume of waste, time of arrival and time of departure

app.post("/vehicle/entry",
//  verifyJWT,
  // verifyStsManager,
   async (req, res) => {
  try {

    const result = await vehicleEntry.create(req.body);
  
    res.status(201).send({success:true,result});
  } catch (err) {
    res.status(400).send(err);
  }
});


// Assign vehicle to sts 
app.put("/assign/vehicle", verifyJWT, verifyAdmin, async (req, res) => {
  try {
    // console.log(req.body);
    const {vehicle_number,ward_number} = req.body;
    const result = await Sts.updateOne(
      {ward_number:parseInt(ward_number)},
      { $addToSet: { vehicle_number: parseInt(vehicle_number ) } }
    
    );
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Entry of dumping truck by landfill manager

app.post(
  "/dumping-truck/entry",
  // verifyJWT,
  // verifyLandfillManager,
  async (req, res) => {
    try {
      // console.log(req.body);
      const result = await DumpingTruckEntry.create(req.body);
      res.status(201).send({success:true,result});
    } catch (err) {
      res.status(400).send(err);
    }
  }
);


// Create landfill
app.post(
  "/create/landfill",
  verifyJWT,
  verifyAdmin,
  async (req, res) => {
    try {
      // console.log(req.body);
      const result = await Landfill.create(req.body);
      res.status(201).send({success:true,
      result});
    } catch (err) {
      res.status(400).send(err);
    }
  }
);


app.put("/landfill_manager/assign", async (req, res) => {
  try {
    const { email, landfill_id } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          role: "landfill_manager",
        },
      }
    );
    if (!user) {
      return res.status(201).send({
        success:false,
        err
      });
    }
    const result = await Landfill.updateOne(
      { landfill_id },
      {
        $addToSet: {
          userId: user._id,
        },
        // userId: user._id,
      },
      { upsert: true }
    );
    // console.log(user);
    res.status(201).send({ success: true, result });
  } catch (err) {
    console.log("bad req");
    res.status(400).send(err);
  }
});


// get the role details like where role is assigned
app.get("/users/role-details/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
   console.log(userId);
    // const result = await User.findOne({ _id: id }).select({ profile: 1 });
    const result =await Landfill.findOne({ userId: { $elemMatch: { $eq: (userId) } } });
    console.log(result);
    res.status(200).json({ success:true,result });
  } catch (err) {
    res.status(400).send(err);
  }
});
app.get("/sts-manager/role-details/:userId", async (req, res) => {
  // console.log("ashcilam")
  try {
    const userId = req.params.userId;
  //  console.log(userId);
    // const result = await User.findOne({ _id: id }).select({ profile: 1 });
    const result =await Sts.findOne({ userId: { $elemMatch: { $eq: (userId) } } });
    console.log(result);
    res.status(200).json({ success:true,result });
  } catch (err) {
    res.status(400).send(err);
  }
});



app.get('/get-sts-info/:vehicleNumber',async (req,res) => {
  try{
    
    const vehicleNumber = req.params.vehicleNumber;
    console.log(typeof(vehicleNumber) );
      console.log("clicked");
      const stsInfo = await Sts.find({}).select({__v:0,_id:0});
      // const stsInfo = await Sts.findOne({ vehicle_number: { $elemMatch: { $eq: parseInt(vehicleNumber) } } }).select({__v:0,_id:0});
      console.log(stsInfo);
      console.log("Cliecked2");
      if(stsInfo){
        const vehicleInfo = await Vehicle.findOne({ vehicle_number: parseInt(vehicleNumber)}).select({__v:0,_id:0});
        res.status(200).send({success:true,result:{stsInfo:stsInfo,vehicleInfo}});
      }
      else{
        res.status(200).send({success:false,stsInfo:null,vehicleInfo:null});
      }
  }
  catch(err){
    res.status(400).send(err);
  }
    

})
app.get('/coordinates-and-edges/',async (req,res) => {
  try{
    
      // const id = req.params.id;
      const coordinates = await Coordinate.find({}).select({__v:0,_id:0});
      // const stsInfo = await Sts.findOne({ vehicle_number: { $elemMatch: { $eq: parseInt(vehicleNumber) } } }).select({__v:0,_id:0});
      // console.log(stsInfo);
      console.log("Cliecked2");
      if(coordinates){
        const edges = await Edge.find({});
        // const landfill = await Landfill.find();
        res.status(200).send({success:true,coordinates,edges});
      }
      else{
        res.status(200).send({success:false,coordinates:null,edges:null});
      }
  }
  catch(err){
    res.status(400).send(err);
  }
    

})



// create billing


app.post("/bill/entry", async (req, res) => {
  try {
    // console.log(req.body);
    const result = await Billing.create(req.body);
    res.status(201).send({ success: true, result });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/all-bills", async (req, res) => {
  // console.log("ashcilam")
  try {
    const userId = req.params.userId;
  //  console.log(userId);
    // const result = await User.findOne({ _id: id }).select({ profile: 1 });
    const result =await Billing.find({}).sort({createdAt:-1});
    console.log(result);
    res.status(200).json({ success:true,result });
  } catch (err) {
    res.status(400).send(err);
  }
});



// Create Contractor Company 
app.post("/create/contractorComapany", async (req, res) => {
  try {
    // console.log(req.body);
    const {
      companyName,
      contractID,
      registrationID,
      registrationDate,
      TIN,
      contactNumber,
      workforceSize,
      paymentPerTonnage,
      requiredAmountPerDay,
      contractDuration,
      areaOfCollection,
      designatedSTS
    } = req.body;
    const temp = {
      companyName,
      contractID,
      registrationID,
      registrationDate,
      TIN,
      contactNumber,
      workforceSize:parseInt(workforceSize),
      paymentPerTonnage:parseInt(paymentPerTonnage),
      requiredAmountPerDay:parseInt(requiredAmountPerDay),
      contractDuration:parseInt(contractDuration),
      areaOfCollection:parseInt(areaOfCollection),
      designatedSTS:parseInt(designatedSTS)
    }
    console.log(temp);
    
    const result = await ContractorCompany.create(temp);
    res.status(201).send({ success: true, result });
  } catch (err) {
    res.status(400).send(err);
  }
});




// Create a Contractor Manager
app.post("/create/contractorManager", async (req, res) => {
  try {
    // console.log(req.body);
    const result = await ContractorManager.create(req.body);
    res.status(201).send({ success: true, result });
  } catch (err) {
    res.status(400).send(err);
  }
});


// Workforce registration 
app.post("/create/workForce", async (req, res) => {
  try {
    // console.log(req.body);
    const result = await WorkForce.create(req.body);
    res.status(201).send({ success: true, result });
  } catch (err) {
    res.status(400).send(err);
  }
});


app.post("/create/workForce", async (req, res) => {
  try {
    // console.log(req.body);
    const result = await WorkForce.create(req.body);
    res.status(201).send({ success: true, result });
  } catch (err) {
    res.status(400).send(err);
  }
});




// Automatic billing

// app.get("/api/stations", async (req, res) => {
//   try {
//     const result = await Station.find({}).sort({ station_id: 1 });
//     res.status(200).json({ stations: result });
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// app.get("/api/stations/:station_id/trains", async (req, res) => {
//   const station_id = req.params.station_id;
//   // console.log(station_id);
//   try {
//     // const result = await Train.find({});

//     // const result = await Train.aggregate([
//     //   { $unwind: "$stops" },
//     //   { $match: { "stops.station_id": station_id } },
//     //   {
//     //     $sort: {
//     //       "stops.departure_time": 1,
//     //       "stops.arrival_time": 1,
//     //       // train_id: 1,
//     //     },
//     //   },
//     //   {
//     //     $group: {
//     //       _id: "$_id",
//     //       // train_id: { $first: "$train_id" },
//     //       // train_name: { $first: "$train_name" },
//     //       // capacity: { $first: "$capacity" },
//     //       // stops: { $push: "$stops" },
//     //     },
//     //   },
//     // ]);
//     return res
//       .status(200)
//       .send({ station_id: parseInt(station_id), trains: [] });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// app.get("/api/wallets/:wallet_id", async (req, res) => {
//   try {
//     const wid = req.params.wallet_id;
//     const result = await User.findOne({ user_id: wid });
//     if (result) {
//       const final = {
//         wallet_id: parseInt(wid),
//         balance: result.balance,
//         wallet_user: {
//           user_id: parseInt(wid),
//           user_name: result.user_name,
//         },
//       };
//       return res.status(200).send(final);
//     }
//     return res.status(404).send({
//       message: `wallet with id: ${wid} was not found`,
//     });
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// app.put("/api/wallets/:wid", async (req, res) => {
//   try {
//     const wid = req.params.wid;
//     const amt = req.body.recharge;
//     const result = await User.findOne({ user_id: wid });
//     if (!result) {
//       return res.status(404).json({
//         message: `wallet with id: ${wid} was not found`,
//       });
//     }
//     if (amt < 100 || amt > 10000) {
//       return res.status(404).json({
//         message: `invalid amount: ${amt}`,
//       });
//     }

//     User.updateOne(
//       { user_id: wid },
//       { balance: result.balance + req.body.recharge }
//     )
//       .then(() => {
//         const final = {
//           wallet_id: parseInt(wid),
//           balance: result.balance + req.body.recharge,
//           wallet_user: {
//             user_id: parseInt(wid),
//             user_name: result.user_name,
//           },
//         };
//         res.status(200).json(final);
//       })
//       .catch((error) => {
//         res.status(400).json({
//           error: error,
//         });
//       });
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

app.get("/", (req, res) => {
  res.json({ a: "hello" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
