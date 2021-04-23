import React, { useState, useEffect } from "react";

import "./InputForms.css"

import BackButton from "../../../ReusableElements/BackButton/BackButton"

import SelectField from "../SelectField/SelectField";
import InputField from "../InputField/InputField";

import SubmitButton from "../../../ReusableElements/SubmitButton/SubmitButton"

import Modal from "../../../ReusableElements/Modal/Modal"
import GrapeSpinner1 from "../../../ReusableElements/Spinners/GrapeSpinner"
import Calendar from "../../../ReusableElements/Calendar/Calendar";
import TextField from "../InputField/InputTextField";

const FuelConsumptionInput = (props) => {
  
 const [ , setDisableButtton ] = useState(false)

 useEffect(() => {
   if (props.localState.selectedSpendingOrPurchaseId === 1) {
     if (props.localState.selectedMachineId && 
      props.localState.selectedAttachedMachineryId && 
      props.localState.selectedLocationId && 
      props.localState.selectedOperatorId &&
      props.localState.kilometersOnMachine && 
      props.localState.liters &&
      props.localState.tankNum && 
      props.localState.date !== "null-null-null") {
      setDisableButtton(props.localState.submitButtonDisabled = true) }
      else return setDisableButtton(props.localState.submitButtonDisabled = false) 
  } else if (props.localState.selectedSpendingOrPurchaseId === 2) {
    if (props.localState.supplierOfFuel && 
      props.localState.deliveryNote && 
      props.localState.selectedLocationId && 
      props.localState.selectedOperatorId &&
      props.localState.liters &&
      props.localState.tankNum && 
      props.localState.date !== "null-null-null") {
      setDisableButtton(props.localState.submitButtonDisabled = true) }
      else return setDisableButtton(props.localState.submitButtonDisabled = false) 
  }
    else {
    setDisableButtton(props.localState.submitButtonDisabled = false) }
  }, [props])

   return (
      <div className="full-div">
        <BackButton onClick={props.onClick}/>
        <h2>Fuel Registration</h2>
               
        <div className="input-forms">
         <form onSubmit={props.formHandler}>
         
          <div style={{marginTop: "20px"}}>  
              <Calendar
                stateProps={props.stateProps}
                onChange={props.dateHandler}
                value={props.localState.date}/>             
           </div>

            <SelectField
              id={props.localState.selectFields[12].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedSpendingOrPurchaseId}
              selectedId={props.localState.selectFields[12].value}
              statename={props.localState.selectFields[12].statename}
            />

           {props.localState.selectedSpendingOrPurchaseId ?
            <SelectField
              id={props.localState.selectFields[4].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedOperatorId}
              selectedId={props.localState.selectFields[4].value}
              statename={props.localState.selectFields[4].statename}
          /> : null }
                                   
            {props.localState.selectedOperatorId ?
                <SelectField
                stopComponentDidUpdate={props.stopComponentDidUpdate}
                id={props.localState.selectFields[2].id}
                onChange={props.selectFieldsHandler}
                value={props.localState.selectedLocationId}
                selectedId={props.localState.selectFields[2].value}
                statename={props.localState.selectFields[2].statename}
              /> : null
              }

            {/* Fuel Consumption */}
            {props.localState.selectedSpendingOrPurchaseId === 1 ?
              <div>
              {props.localState.selectedLocationId ?
              <SelectField
              id={props.localState.selectFields[0].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedMachineId}
              machineImage={props.localState.selectedMachineImage}
              statename={props.localState.selectFields[0].statename}
              selectedId={props.localState.selectFields[0].value}
              selectedMachineImage={props.localState.selectFields[0].image}
              stopComponentDidUpdate={props.stopComponentDidUpdate}
              onFocusHandler={props.onFocusHandler}
              /> : null}

              {props.localState.selectedMachineId ?
              <SelectField
              id={props.localState.selectFields[1].id}
              machineImage={props.localState.selectedAttachedMachineryImage}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedAttachedMachineryId}
              statename={props.localState.selectFields[1].statename}
              selectedId={props.localState.selectFields[1].value}
              selectedMachineImage={props.localState.selectFields[1].image}
              stopComponentDidUpdate={props.stopComponentDidUpdate}
              onFocusHandler={props.onFocusHandler}
              /> : null }

              {props.localState.selectedAttachedMachineryId ?
                <div className="input">
                  <InputField 
                    id={props.localState.inputFields[0].id}
                    onChange={props.inputFieldsHandler}
                    name={[props.localState.inputFields][0][0].name}
                    statename={[props.localState.inputFields][0][0].statename}/>
                  <InputField 
                    id={props.localState.inputFields[1].id}
                    onChange={props.inputFieldsHandler}
                    name={[props.localState.inputFields][0][1].name}
                    statename={[props.localState.inputFields][0][1].statename}/> 
                  <InputField 
                    id={props.localState.inputFields[2].id}
                    onChange={props.inputFieldsHandler}
                    name={[props.localState.inputFields][0][2].name}
                    statename={[props.localState.inputFields][0][2].statename}/>
                </div>: null
              } 
              
             </div>
          : 
          // Fuel Purchase
            <div>
            {props.localState.selectedOperatorId ?
              <div className="input">
                
            {props.localState.selectedOperatorId ?
            <SelectField
              id={props.localState.selectFields[17].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedSupplierOfFuelId}
              selectedId={props.localState.selectFields[17].value}
              statename={props.localState.selectFields[17].statename}
            /> : null }

                <InputField 
                  id={props.localState.inputFields[1].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][1].name}
                  statename={[props.localState.inputFields][0][1].statename}/> 
                <InputField 
                  id={props.localState.inputFields[2].id + 100}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][2].name}
                  statename={[props.localState.inputFields][0][2].statename}/>
              </div>: null
            } 

            {props.localState.selectedOperatorId ?
             <TextField 
                  id={props.localState.inputFields[8].id}
                  onChange={props.inputFieldsHandler}
                  name={[props.localState.inputFields][0][8].name}
                  statename={[props.localState.inputFields][0][8].statename}/>
               : null}
                                    
            </div>}

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

export default FuelConsumptionInput;