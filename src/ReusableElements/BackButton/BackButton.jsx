import React from "react";

import "./BackButton.css"

const BackButton = ({onClick}) => {
  return (
    <div className="back-button">
      <button 
      onClick={() => onClick()}>
        Back
      </button>
    </div>
  )
}

export default BackButton;