import React from "react";
import { updateAuthUsers } from "../../Firebase/UpdateRowsInRealtimeDB";
import { getDateAndTime } from "../../Pages/InputPage/DBObjectElements/GetDateTime";

import "./DeleteButton.css"

const DeleteButton = ({onClick, id, stateProps}) => {
  const nameOfDB = stateProps.selectedActivity === 0 ? "Fuel Consumption" :
  stateProps.selectedActivity === 1 ? "Machine Registration" :
  stateProps.selectedActivity === 2 ? "Maintenance & Repair" :
  stateProps.selectedActivity === 3 ? "Work Hours Registraiton" :
  stateProps.selectedActivity === 4 ? "Purchase Request" :
  stateProps.selectedActivity === 5 ? "Select Field" : null
  
  const recordTrace = () => {
    updateAuthUsers({ DeletedRow: id + " " + nameOfDB + ", " + getDateAndTime()}, 
      stateProps)
  }
 
  return (
    <div className="delete-button">
      <button 
         onClick={() => {onClick(); recordTrace()}}>
        Delete
      </button>
    </div>
  )
}

export default DeleteButton;