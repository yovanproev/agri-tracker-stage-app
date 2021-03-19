import React, { useState, useEffect } from "react";

import "./InputForms.css"

import BackButton from "../../../ReusableElements/BackButton/BackButton"

import SelectField from "../SelectField/SelectField";
import MultiSelectField from "../MultipleSelectField/MultipleSelectField";

import SubmitButton from "../../../ReusableElements/SubmitButton/SubmitButton"

import Modal from "../../../ReusableElements/Modal/Modal"
import GrapeSpinner1 from "../../../ReusableElements/Spinners/GrapeSpinner"
import Calendar from "../../../ReusableElements/Calendar/Calendar";
import WorkHoursInputTable from "../WorkHoursInputTable/WorkHoursInputTable";

const WorkingHoursInput = (props) => {
 const [ , setDisableButtton ] = useState(false)
 
  useEffect(() => {
    if (props.localState.date !== "null-null-null" &&
        props.localState.selectedTypeOfHoursId && 
        props.localState.selectedLocationId && 
        props.localState.selectedProjectId &&
        props.localState.selectedMSJobDescriptionId &&
        props.localState.nameOfEmployee &&
        props.localState.manHours
        )
    setDisableButtton(props.localState.submitButtonDisabled = true) 
    else {
      setDisableButtton(props.localState.submitButtonDisabled = false) }
  }, [props])

  const arrayOfNames = props.localState.selectedMSJobDescriptionId ? props.localState.selectedMSJobDescriptionId.map(x => x.name) : null
  const arrayOfIds = props.localState.selectedMSJobDescriptionId ? 
  props.localState.selectedMSJobDescriptionId.map(x => x.id) : null
   
  return (
      <div className="full-div">
        <BackButton onClick={props.onClick}/>
        <h2>Working Hours Registration</h2>
               
        <div className="input-forms">
         <form onSubmit={props.formHandler}>

           <div style={{marginTop: "20px"}}>  
              <Calendar
                stateProps={props.stateProps}
                onChange={props.dateHandler}
                value={props.localState.date}
              /> 
            </div>

            <SelectField
             id={props.localState.selectFields[9].id}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedTypeOfHoursId}
             selectedId={props.localState.selectFields[9].value}
             statename={props.localState.selectFields[9].statename}
            />

            {props.localState.selectedTypeOfHoursId ?
              <SelectField
              id={props.localState.selectFields[2].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedLocationId}
              selectedId={props.localState.selectFields[2].value}
              statename={props.localState.selectFields[2].statename}
              stopComponentDidUpdate={props.stopComponentDidUpdate}
              /> : null
            }

            {props.localState.selectedLocationId ?
            <SelectField
             id={props.localState.selectFields[10].id}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedProjectId}
             selectedId={props.localState.selectFields[10].value}
             statename={props.localState.selectFields[10].statename}
            /> : null }

            {props.localState.selectedProjectId ?
             <MultiSelectField
              id={props.localState.selectFields[11].id}
              onSelect={props.multiSelectHandler}
              value={props.localState.selectedMSJobDescriptionId}
              disableMultiSelectOption={props.localState.disableMultiSelectOption}
            /> : null
            }

            {props.localState.selectedMSJobDescriptionId && props.localState.disableMultiSelectOption === false ?
            <button type="button" className="btn" style={{marginTop: "15px", backgroundColor: "green"}} 
            onClick={props.disableMultiSelectOptionHandler}>Create Table</button> : null}
            {props.localState.disableMultiSelectOption ? <button type="button" className="btn btn-danger" 
            style={{marginTop: "15px"}} onClick={props.restartFormHandler}>Restart Entries</button> : null}

            {props.localState.selectedMSJobDescriptionId && props.localState.disableMultiSelectOption ?
            <WorkHoursInputTable 
            jobActivities={props.localState.selectedMSJobDescriptionId}
            tableRowsHandler={props.tableRowsHandler}
            names={arrayOfNames}
            id={arrayOfIds}
            localState={props.localState}
            /> 
            : null} 
              
             {props.localState.submit ?
              <SubmitButton 
              disabled={!props.localState.submitButtonDisabled}
              onClick={() => props.updateId()}
              type="submit"/> 
              : <Modal
              show={props.localState.loading}>
                <GrapeSpinner1 />
              </Modal>
             }           
          </form>
        </div>
      </div>
    )
  
}

export default WorkingHoursInput;