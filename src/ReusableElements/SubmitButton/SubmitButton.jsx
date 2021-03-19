import React from "react";

import "./SubmitButton.css"

const submitButton = (props) => {
  
  return (
    <div >
      <button className="submit-button"
      disabled={props.disabled}
      onClick={props.onClick}>
        Submit
      </button>
    </div>
  )
}

export default submitButton;