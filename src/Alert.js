// Importing Helpers
import React, { useEffect } from "react";

// Functional Component
const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]); // eslint-disable-line react-hooks/exhaustive-deps
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

// Default Export
export default Alert;
