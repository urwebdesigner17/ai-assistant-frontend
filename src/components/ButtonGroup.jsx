import "../App.css";
// src/components/ButtonGroup.jsx
import React from "react";

export default function ButtonGroup({
  handleEnable,
  handleEnablePDF,
  handleClear,
  activeButton,
}) {
  return (
    <div className="button-group">
      <button
        onClick={handleEnable}
        className={`btn ${activeButton === "domain" ? "active" : ""}`}
      >
        Third Party Domain
      </button>

      <button
        onClick={handleEnablePDF}
        className={`btn ${activeButton === "pdf" ? "active" : ""}`}
      >
        PDF Format
      </button>

      <button onClick={handleClear} className="btn clear">
        Clear
      </button>
    </div>
  );
}
