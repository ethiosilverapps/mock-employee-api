const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

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
    let id = Math.floor(Math.random() * 10000000000); //This is just to generate a mock employee ID
    employee.push({
      id: id,
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

app.listen(8080, () => console.log("Node Server Listening on port 8080"));
