import React, { useState, useEffect } from "react";

import "./InputForms.css"

import BackButton from "../../../ReusableElements/BackButton/BackButton"
import SubmitButton from "../../../ReusableElements/SubmitButton/SubmitButton"
import Modal from "../../../ReusableElements/Modal/Modal"
import GrapeSpinner1 from "../../../ReusableElements/Spinners/GrapeSpinner"
import Calendar from "../../../ReusableElements/Calendar/Calendar";

import SelectField from "../SelectField/SelectField";
import PurchaseRequestInputTable from "../PurchaseRequestInputTable/PurchaseRequestInputTable";


const PurchaseRequestsInput = (props) => {

  const [ , setDisableButtton ] = useState(false)

 useEffect(() => {
  if (props.localState.selectedOperatorId && 
      props.localState.supplier &&
      props.localState.purchase &&
      props.localState.date !== "null-null-null")
  setDisableButtton(props.localState.submitButtonDisabled = true) 
  else {
    setDisableButtton(props.localState.submitButtonDisabled = false) }
  }, [props])

  const [ addItem, updateAddItem ] = useState([1])
  const addItemHandler = () => {
    updateAddItem([...addItem, parseInt(addItem) + 1])
  }

   return (
      <div className="full-div">
        <BackButton onClick={props.onClick}/>
        <h2>Purchase Requests</h2>
        
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
              id={props.localState.selectFields[4].id}
              onChange={props.selectFieldsHandler}
              value={props.localState.selectedOperatorId}
              selectedId={props.localState.selectFields[4].value}
              statename={props.localState.selectFields[4].statename}
             /> 
            
            {props.localState.selectedOperatorId ?
            <SelectField
             id={props.localState.selectFields[14].id}
             onChange={props.selectFieldsHandler}
             value={props.localState.selectedSupplierId}
             selectedId={props.localState.selectFields[14].value}
             statename={props.localState.selectFields[14].statename}
             /> : null }

           {props.localState.selectedSupplierId ?
            <PurchaseRequestInputTable 
            purchaseRequestTableHandler={props.purchaseRequestTableHandler}
            localState={props.localState} addItem={addItem}
            /> 
            : null} 

           {props.localState.selectedSupplierId ? 
             <button type="button" className="btn btn-success"
             onClick={() => addItemHandler()}>Add Item</button> : null}
            
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

export default PurchaseRequestsInput;