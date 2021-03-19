import React from "react";

import "./InputField.css";

const InputField = (props) => {
  return (
    <div className="input-div">
      <p>{props.name}</p>
      <input
        type="number"
        min="0"
        step="0.1"
        id={props.id}
        name={props.statename}
        onChange={(e) =>
          props.onChange(e.target.value, parseInt(e.target.id), e.target.name)
        }
      />
    </div>
  );
};

export default InputField;
