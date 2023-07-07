const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.static("public"));
app.use(express.json());

const port = 8080;

//Mock employee Database
let employee = [
  {
    id: 1111,
    firstName: "Nahom",
    lastName: "Abebe",
    jobTitle: "Software Engineer",
  },
  {
    id: 2222,
    firstName: "Melat",
    lastName: "Bekele",
    jobTitle: "HR Manager",
  },
];

let currentId = 2222;

//You can use this endpoint to check the health status of the server
app.get("/", async (req, res) => {
  console.log("GET: / called");
  res.status(200);
  res.send("Health check OK.");
});

//This endpoint will return server info
app.get("/server-info", async (req, res) => {
  console.log("GET: /server-info called");
  res.status(200);
  res.send({
    availabilityZone: process.env.AZ_VAL,
    instanceId: process.env.INSTANCE_ID,
  });
});

//This endpoint will return all employee data from our mock database
app.get("/employees", async (req, res) => {
  console.log("GET: /employees called");
  res.status(200);
  res.send(employee);
});

//This endpoint will add an employee to our mock database
app.post("/employee", async (req, res) => {
  const { firstName, lastName, jobTitle } = req.body;

  console.log(
    "POST: /employee called with " +
      "FirstName=" +
      firstName +
      " LastName=" +
      lastName +
      " JobTitle=" +
      jobTitle
  );

  //very simple verification
  if (
    typeof firstName === "string" &&
    typeof lastName === "string" &&
    typeof jobTitle === "string"
  ) {
    currentId += 1;
    employee.push({
      id: currentId,
      firstName: firstName,
      lastName: lastName,
      jobTitle: jobTitle,
    });
    res.status(200);
    res.send({ msg: "Employee was added successfully!" });
  } else {
    res.status(400);
    res.send({
      msg: "You passed in an incorrect format of Employee data. Please make sure you pass firstName, LastName and jobTitle. ",
    });
  }
});

//This endpoint will delete an employee from our mock database
app.delete("/employee", async (req, res) => {
  let id = parseInt(req.query.id);

  console.log("DELETE: /employee called with employee ID: " + id);

  //very simple verification
  if (typeof id === "number") {
    let foundEmployee = employee.find((ob) => ob.id == id);

    if (foundEmployee === undefined) {
      //If the employee ID is not in the DB, return 400
      res.status(400);
      res.send({
        msg: "Employee with ID: '" + id + "' not found.",
      });
    } else {
      employee = employee.filter((ob) => ob.id !== id);
      res.status(200);
      res.send({ msg: "Employee was deleted successfully!" });
    }
  } else {
    res.status(400);
    res.send({
      msg: "You passed in an incorrect format of Employee data. Please make sure you pass employee ID.",
    });
  }
});

//This endpoint will be used for ping response
app.get("/ping", async (req, res) => {
  console.log("GET: /ping");

  res.status(200);
  res.send({
    status: "HEALTHY",
    availabilityZone: process.env.AZ_VAL,
    instanceId: process.env.INSTANCE_ID,
  });
});

//This endpoint will ping other mock api server
app.get("/ping-other-instance", async (req, res) => {
  console.log("GET: /ping-other-instance");

  const { url } = req.body;

  axios
    .get(url + "/ping", {})
    .then((response) => {
      res.status(200);
      res.send({
        responseData: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => console.log("Node Server Listening on port " + port));
