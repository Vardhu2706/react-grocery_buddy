// Importing Helpers
import React, { useState, useEffect } from "react";

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
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty string
    if (!name) {
      // Display alert
      showAlert(true, "Invalid Item Name", "danger");
    } else if (name && isEditing) {
      // Edit
    } else {
      showAlert(true, "Item Added", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  // Clear List
  const clearItems = () => {
    setList([]);
    showAlert(true, "List Cleared", "danger");
  };

  // Remove Item
  const removeItem = (id) => {
    showAlert(true, "Item Removed", "danger");
    setList(list.filter((item) => item.id !== id));
  };

  // Show Alert
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>Grocery Buddy</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="Eg. Noodles"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} />
          <button className="clear-btn" onClick={clearItems}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

// Default Export
export default App;
