import React from "react"
import { updateAuthUsers } from "../../../Firebase/UpdateRowsInRealtimeDB"
import { getDateAndTime } from "../../../Pages/InputPage/DBObjectElements/GetDateTime"

import "./InputFieldTable.css"

const InputFieldTable = ({onChange, value, onFocus, id, stateProps, nameOfStatus, purchaseMode, name}) => {
  
  const recordTrace = () => {
    updateAuthUsers({ PurchaseRequestStatus: id + ", " + nameOfStatus + ", " + getDateAndTime()}, 
      stateProps)
    }
    
  return (
      <div >
        {/* For fuel consumption module */}
        {stateProps.selectedActivity === 0 && purchaseMode === "Purchase" ? 
        <input className="text-input-reports" type="number"
         placeholder="Price per liter"
          onChange={(e) => onChange(e)}
          // value={value ? value : ""}
          name={name}
          onFocus={onFocus}
          onBlur={() => recordTrace()}
          id={id}>
          </input> 
        : 
        // for purchase requests module
        <textarea className="text-input-reports" type="text"
         onChange={(e) => onChange(e)}
          // value={value ? value : ""}
          name={name}
          onFocus={onFocus}
          onBlur={() => recordTrace()}
          id={id}>
          </textarea>}
      </div>
    )
  
}

export default InputFieldTable;