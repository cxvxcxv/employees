import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [country, setCountry] = useState(null);
  const [position, setPosition] = useState(null);
  const [salary, setSalary] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [updatedSalary, setUpdatedSalary] = useState(salary);

  const addEmployee = () => {
    axios
      .post("http://localhost:3001/addEmployee", {
        name,
        age,
        country,
        position,
        salary,
      })
      .then(() => {
        console.log("successfully created");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateEmployee = (id) => {
    axios
      .patch("http://localhost:3001/updateEmployee", {
        salary: updatedSalary,
        id,
      })
      .then(() => {
        console.log("successfully updated");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteEmployee = (id) => {
    axios
      .delete(`http://localhost:3001/deleteEmployee/${id}`)
      .then(() => console.log("successfully deleted"));
  };

  useEffect(() => {
    axios.get("http://localhost:3001/getEmployees").then((response) => {
      setEmployees(response.data);
    });
    console.log(employees);
  }, []);

  return (
    <div className="App">
      <label>Name:</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <label>Age:</label>
      <input type="number" onChange={(e) => setAge(e.target.value)} />
      <label>Country:</label>
      <input type="text" onChange={(e) => setCountry(e.target.value)} />
      <label>Position:</label>
      <input type="text" onChange={(e) => setPosition(e.target.value)} />
      <label>Salary:</label>
      <input type="number" onChange={(e) => setSalary(e.target.value)} />

      <button onClick={() => addEmployee()}>Add Employee</button>
      <hr />

      {employees.map((employee) => {
        return (
          <div key={employee.employee_id}>
            name: {employee?.employee_name}
            age:{employee?.employee_age}
            country:{employee?.employee_country}
            position: {employee?.employee_position}
            salary: {employee?.employee_salary}
            <input
              type="number"
              onChange={(e) => setUpdatedSalary(e.target.value)}
            />
            <button onClick={() => updateEmployee(employee.employee_id)}>
              Update Salary
            </button>
            <button onClick={() => deleteEmployee(employee.employee_id)}>
              Delete Employee
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
