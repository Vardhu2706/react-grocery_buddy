// Importing Helpers
import React, { useState, useEffect } from "react";

// Importing Components
import List from "./List";
import Alert from "./Alert";

// Get data stored in Local Storage
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

// Functional Component
function App() {
  // State Variables
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
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

    // value Check
    if (!name) {
      // Empty
      showAlert(true, "Invalid Item Name", "danger");
    } else if (name && isEditing) {
      // Edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "Value Changed", "success");
    } else {
      // Add
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

  // Edit
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(editItem.title);
  };

  // Local Storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
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
          <List items={list} removeItem={removeItem} editItem={editItem} />
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
