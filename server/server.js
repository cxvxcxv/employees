const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "070501",
  database: "employee_system",
});

app.post("/addEmployee", (req, res) => {
  const { name, age, country, position, salary } = req.body;

  db.query(
    "INSERT INTO employees (employee_name, employee_age, employee_country, employee_position, employee_salary) VALUES (?,?,?,?,?)",
    [name, age, country, position, salary],
    (err, response) => {
      if (err) {
        console.log(err);
      } else {
        res.json(response);
      }
    }
  );
});

app.get("/getEmployees", (req, res) => {
  db.query("SELECT * FROM employees", (e, response) => {
    if (e) console.log(e);
    else res.json(response);
  });
});

app.patch("/updateEmployee", (req, res) => {
  const { id, salary } = req.body;
  db.query(
    "UPDATE employees SET employee_salary = ? WHERE employee_id = ?",
    [salary, id],
    (e, response) => {
      if (e) console.log(e);
      else res.json(response);
    }
  );
});

app.delete("/deleteEmployee/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employees WHERE employee_id = ?", id, (e, response) => {
    if (e) res.json(e);
    else res.json(response);
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
