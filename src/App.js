// Importing Helpers
import React, { useState, userEffect } from "react";

// Importing Components
import List from "./List";
import Alert from "./Alert";

// Functional Component
function App() {
  // State Variables
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("test");
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert />}
        <h3>Grocery Buddy</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="Eg. Milk"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>

      <div className="grocery-container">
        <List />
        <button className="clear-btn">Clear Items</button>
      </div>
    </section>
  );
}

// Default Export
export default App;
