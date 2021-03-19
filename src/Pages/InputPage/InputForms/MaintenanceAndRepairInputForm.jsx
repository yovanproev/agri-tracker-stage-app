import React, { useState, useEffect } from "react";

import "./InputForms.css"

import BackButton from "../../../ReusableElements/BackButton/BackButton"

import SelectField from "../SelectField/SelectField";
import InputField from "../InputField/InputField";
import TextField from "../InputField/InputTextField";

import SubmitButton from "../../../ReusableElements/SubmitButton/SubmitButton"

import Modal from "../../../ReusableElements/Modal/Modal"
import GrapeSpinner1 from "../../../ReusableElements/Spinners/GrapeSpinner"
import Calendar from "../../../ReusableElements/Calendar/Calendar";

const MaintenanceAndRepairsInput = (props) => {
 const [ , setDisableButtton ] = useState(false)

 useEffect(() => {
  if (props.localState.selectedMachineId && 
      props.localState.selectedAttachedMachineryId && 
      props.localState.workedHours &&
      props.localState.selectedLocationId && 
      props.localState.selectedTechnicianId &&
      props.localState.selectedMaintenanceId &&
      props.localState.selectedMachineMaintenanceId &&
      props.localState.explainTheActivity &&  
      props.localState.costOfTechnician &&  
      props.localState.date !== "null-null-null")
  setDisableButtton(props.localState.submitButtonDisabled = true) 
  else {
    setDisableButtton(props.localState.submitButtonDisabled = false) }
  }, [props])

  return (
      <div className="full-div">
        <BackButton onClick={props.onClick}/>
        <h2>Maintenance and Repairs</h2>

        <div style={{margin: "20px auto"}}>  
           <Calendar
              stateProps={props.stateProps}
              onChange={props.dateHandler}
              value={props.localState.date}
            /> 
        </div>       
        <div className="input-forms">
          <SelectField
            id={props.localState.selectFields[2].id}
            onChange={props.selectFieldsHandler}
            value={props.localState.selectedLocationId}
            selectedId={props.localState.selectFields[2].value}
            statename={props.localState.selectFields[2].statename}
            stopComponentDidUpdate={props.stopComponentDidUpdate}
          /> 
          
        
         <form onSubmit={props.formHandler}>
           {props.localState.selectedLocationId ?
            <SelectField
             id={props.localState.selectFields[0].id}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedMachineId}
             machineImage={props.localState.selectedMachineImage}
             selectedId={props.localState.selectFields[0].value}
             selectedMachineImage={props.localState.selectFields[0].image}
             statename={props.localState.selectFields[0].statename}
             stopComponentDidUpdate={props.stopComponentDidUpdate}
             onFocusHandler={props.onFocusHandler}
            /> : null}

            {props.localState.selectedMachineId ?
            <SelectField
             id={props.localState.selectFields[1].id}
             machineImage={props.localState.selectedAttachedMachineryImage}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedAttachedMachineryId}
             selectedId={props.localState.selectFields[1].value}
             selectedMachineImage={props.localState.selectFields[1].image}
             statename={props.localState.selectFields[1].statename}
             stopComponentDidUpdate={props.stopComponentDidUpdate}
             onFocusHandler={props.onFocusHandler}
            /> : null }


            {props.localState.selectedAttachedMachineryId ?
              <SelectField
              id={props.localState.selectFields[7].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedMaintenanceId}
              selectedId={props.localState.selectFields[7].value}
              statename={props.localState.selectFields[7].statename}
             /> : null
            }

           {props.localState.selectedMaintenanceId ?
              <SelectField
              id={props.localState.selectFields[8].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedTechnicianId}
              selectedId={props.localState.selectFields[8].value}
              statename={props.localState.selectFields[8].statename}
             /> : null
            }

            {props.localState.selectedTechnicianId ?
              <SelectField
              id={props.localState.selectFields[6].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedMachineMaintenanceId}
              selectedId={props.localState.selectFields[6].value}
              statename={props.localState.selectFields[6].statename}
             /> : null
            }    

           {props.localState.selectedMachineMaintenanceId ?
              <div className="input">
               <TextField 
                  id={props.localState.inputFields[4].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][4].name}
                  statename={[props.localState.inputFields][0][4].statename}/>
              </div>: null
            } 

            {props.localState.selectedMachineMaintenanceId ?
              <div className="input">
               <InputField 
                id={props.localState.inputFields[3].id}
                onChange={props.inputFieldsHandler}
                name={[props.localState.inputFields][0][3].name}
                statename={[props.localState.inputFields][0][3].statename}/>
              </div> : null }

              {props.localState.selectedMachineMaintenanceId ?
              <div className="input">
                <InputField 
                    id={props.localState.inputFields[6].id}
                    onChange={props.inputFieldsHandler}
                    name={[props.localState.inputFields][0][6].name}
                    statename={[props.localState.inputFields][0][6].statename}/> 
                </div>: null}

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

export default MaintenanceAndRepairsInput;