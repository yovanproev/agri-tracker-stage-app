import React, { useState, useEffect } from "react";

import "./InputForms.css"

import BackButton from "../../../ReusableElements/BackButton/BackButton"

import SelectField from "../SelectField/SelectField";
import InputField from "../InputField/InputField";

import SubmitButton from "../../..//ReusableElements/SubmitButton/SubmitButton"

import Modal from "../../..//ReusableElements/Modal/Modal"
import GrapeSpinner1 from "../../..//ReusableElements/Spinners/GrapeSpinner"
import Calendar from "../../../ReusableElements/Calendar/Calendar";

const MachineRegistrationInput = (props) => {

  const [ , setDisableButtton ] = useState(false)

 useEffect(() => {
  if (props.localState.selectedMachineId && 
      props.localState.selectedAttachedMachineryId && 
      props.localState.selectedFarmId &&
      props.localState.kilometersOnMachine && 
      props.localState.selectedOperatorId &&
      props.localState.selectedMachinesJobsId &&
      props.localState.date !== "null-null-null")
  setDisableButtton(props.localState.submitButtonDisabled = true) 
  else {
    setDisableButtton(props.localState.submitButtonDisabled = false) }
  }, [props])

  return (
      <div className="full-div">
        <BackButton onClick={props.onClick}/>
        <h2>Machine Registration</h2>
        
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
             id={props.localState.selectFields[0].id}
             machineImage={props.localState.selectedMachineImage}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedMachineId}
             selectedId={props.localState.selectFields[0].value}
             selectedMachineImage={props.localState.selectFields[0].image}
             statename={props.localState.selectFields[0].statename}
             onFocusHandler={props.onFocusHandler}
             stopComponentDidUpdate={props.stopComponentDidUpdate}
            />
            
            {props.localState.selectedMachineId ?
            <SelectField
             id={props.localState.selectFields[1].id}
             machineImage={props.localState.selectedAttachedMachineryImage}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedAttachedMachineryId}
             selectedId={props.localState.selectFields[1].value}
             selectedMachineImage={props.localState.selectFields[1].image}
             statename={props.localState.selectFields[1].statename}
             onFocusHandler={props.onFocusHandler}
             stopComponentDidUpdate={props.stopComponentDidUpdate}
            /> : null }

            {props.localState.selectedAttachedMachineryId ?
              <SelectField
              id={props.localState.selectFields[5].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedFarmId}
              selectedId={props.localState.selectFields[5].value}
              statename={props.localState.selectFields[5].statename}
             /> : null
            }

            {props.localState.selectedFarmId ?
              <SelectField
              id={props.localState.selectFields[3].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedProductId}
              selectedId={props.localState.selectFields[3].value}
              statename={props.localState.selectFields[3].statename}
             /> : null
            }

           {props.localState.selectedProductId ?
            <SelectField
             id={props.localState.selectFields[13].id}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedMachinesJobsId}
             selectedId={props.localState.selectFields[13].value}
             statename={props.localState.selectFields[13].statename}
             /> : null }

            {props.localState.selectedMachinesJobsId ?
              <div className="input">
                <InputField 
                  id={props.localState.inputFields[0].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][0].name}
                  statename={[props.localState.inputFields][0][0].statename}/>
              </div>: null} 
           
            {props.localState.selectedMachinesJobsId ?
              <SelectField
              id={props.localState.selectFields[4].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedOperatorId}
              selectedId={props.localState.selectFields[4].value}
              statename={props.localState.selectFields[4].statename}
             /> : null
            }

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

export default MachineRegistrationInput;