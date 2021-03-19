import React from "react"

import "./SelectActivity.css"

import ActivityBubble from "../ReusableElements/ActivityBubble/ActivityBubble"
import SelectReport from "./ReportsPage/SelectReport"
import InputSelection from "./InputPage/InputSelection"
import AdminReports from "./AdminPage/AdminReports"

const SelectActivity = (props) => {
 
 return (
    <div className="table-reports">
      {props.stateProps.inputMode ?
      <h2 className="headline">Input Form</h2> :
      props.stateProps.outputMode ? <h2 className="headline">Reports</h2> : <h2 className="headline">
        Admin section</h2>}
     
      {!props.stateProps.outputTable && !props.stateProps.inputForms
      && !props.stateProps.adminMode ? 
          props.stateProps.activityPerMode.map((activity, index) => (
          <ActivityBubble
          stateProps={props.stateProps}
          onClick={props.onClick}
          key={index}
          id={index}
          children={activity.name}/>
          )) : null
      }

      {!props.stateProps.adminSection && props.stateProps.adminMode ? 
          props.stateProps.adminActivity.map((activity, index) => (
          <ActivityBubble
          stateProps={props.stateProps}
          onClick={props.onClick}
          key={index}
          id={index}
          children={activity.name}/>
          )) : null
      }
           
      {props.stateProps.inputForms ? 
      <InputSelection
        modal={props.modal}
        stateProps={props.stateProps}
        onClick={props.backButton}/> : null
      }

      {props.stateProps.outputTable ? 
        <SelectReport
        modal={props.modal}
        refreshReports={props.refreshReports}
        stateProps={props.stateProps}
        onClick={props.backButton}/> : null
      }

      {props.stateProps.adminSection ? 
        <AdminReports
        modal={props.modal}
        stateProps={props.stateProps}
        onClick={props.backButton}/> : null
      }
    </div>
  ) 
}

export default SelectActivity;