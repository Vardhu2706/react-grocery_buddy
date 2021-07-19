// Importing Helpers
import React from "react";

// Importing Components
import { FaEdit, FaTrash } from "react-icons/fa";

// Functional Component
const List = ({ items, removeItem }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button type="button" className="edit-btn">
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                {" "}
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

// Default Export
export default List;
