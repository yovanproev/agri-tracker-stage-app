import React, { useState, useEffect } from "react";
import Modal from "../../ReusableElements/Modal/Modal";
import Spinner2 from "../../ReusableElements/Spinners/Spinner2"

import { getPaginatedTableData, nextPage, previousPage, counter } from "../../Firebase/FetchDataFromRealtimeDB";
import { deleteByRowId } from "../../Firebase/DeleteRowsInRealtimeDB"
import { updateByRowId } from "../../Firebase/UpdateRowsInRealtimeDB";

import TableReport from "./TableReport/TableReport"
import { fetchStatusOfPurchaseByName } from "../../LocalData/InputFormsData"
import { getSelectFields } from "../../Firebase/FetchCollectionsFromFirestore";

const SelectReport = (props) => {
  const [ table, setTable ] = useState([])
  const [ blockNextButton, updateBlockNextButton ] = useState(undefined)
  const [ error, setError ] = useState(false)
 
  const errorOnDB = () => { setError(true) }

  function nextPageLoad(){
    const nextPageCount = nextPage(props);
    getPaginatedTableData(0, nextPageCount, props, errorOnDB).then((fullData)=>{
      let fullDataArray=[]
      Object.keys(fullData).forEach((key)=>{
        fullDataArray.push(fullData[key]);
      })
      updateBlockNextButton(fullDataArray.length < counter ? true : false )
    setTable(fullDataArray)
    })
  }

  function previousPageLoad(){
    const previousPageCount = previousPage(props);
    getPaginatedTableData(0, previousPageCount, props, errorOnDB).then((fullData)=>{
      let fullDataArray=[]
      Object.keys(fullData).forEach((key)=>{
        fullDataArray.push(fullData[key]);
      })
      updateBlockNextButton(fullDataArray.length > counter ? true : false)
    setTable(fullDataArray)
    })
  }

  const [ categorySelectField, updateCategorySelectField ] = useState([]);
  const [ subcategorySelectField, updateSubcategorySelectField ] = useState([]);
  useEffect(() => {
        getPaginatedTableData(0, 10, props, errorOnDB).then((fullData)=>{
          if (fullData === null || fullData === undefined) {errorOnDB()}
            else {let fullDataArray=[]
            Object.keys(fullData).forEach((key)=>{
              fullDataArray.push(fullData[key]);
            })
            setTable(fullDataArray)}
        })

        getSelectFields(16).then(category => updateCategorySelectField(category))
        getSelectFields(17).then(category => updateSubcategorySelectField(category))
  }, [props]);
    
  const deleteRowHandler = (rowId, numberOfEmployee, numberOfJob, numberOfItem, parentId) => {
  const rows = props.stateProps.selectedActivity === 3 ? (Object.values(table).filter(x => x.id !== rowId)) :
  props.stateProps.selectedActivity === 4 ? (Object.values(table)[0]?.filter(x => x.id !== rowId)) :
   table.filter((row) => row.id !== rowId);

    deleteByRowId(rowId, props, numberOfEmployee, numberOfJob, numberOfItem, parentId)
    setTable(rows) 
  }

  // get the table row number 
  const [ rowIdValue, setRowId ] = useState(undefined);
  const [ numberOfItem, setNumberOfItem ] = useState(undefined);
 
  const onClickRowId = (rowId, numberOfItem) => {
    if (rowId.id !== undefined) {
    setRowId(rowId.id)
    setNumberOfItem(numberOfItem)
    }  else return 0 }
  
  const [ customInputRowsValue, updateCustomInputRowsValue ] = useState({
    PRNumber: "",
    invoiceNumber: "",
    pricePerLiter: "",
  })

  const updateCustomInputRowsValueHandler = (e) => {
    updateCustomInputRowsValue({
      ...customInputRowsValue,
    [e.target.name] : [e.target.value]})
    
    const updateForPRNumber = {PRNumber: [e.target.value][0]}
    const updateForInvoiceNum = {invoiceNum: [e.target.value][0]}
    const updateForFuelPrice = {pricePerLiter: [e.target.value][0]}

    const valueForUpdate = e.target.name === "PRNumber" ? updateForPRNumber :
    e.target.name === "invoiceNum" ? updateForInvoiceNum : 
    e.target.name === "pricePerLiter" ? updateForFuelPrice : null
    
    updateByRowId(rowIdValue, props.stateProps, null, null, valueForUpdate, null, errorOnDB, numberOfItem)
  }

  const [ customSelectRowsValue, updateCustomSelectRowsValue ] = useState({
    category: "",
    subcategory: "",
    statusOfRequest: "",
  })
  
  const updateCustomSelectRowsValueHandler = (e) => {
    updateCustomSelectRowsValue({
      ...customSelectRowsValue,
    [e.target.name] : [e.target.value]})
    
    const filteredCategory = categorySelectField.filter(x => x.id === +([e.target.value][0]))
    const filteredSubcategory = subcategorySelectField.filter(x => x.id === +([e.target.value][0]))
    
    const updateForCategory = {category: filteredCategory[0]?.name}
    const updateForSubCategory = {subcatgegory: filteredSubcategory[0]?.name}
    const updateForStatusOfRequest = {statusOfRequest: fetchStatusOfPurchaseByName([e.target.value][0])}
   
    const valueForUpdate = e.target.name === "category" ? updateForCategory :
    e.target.name === "subcategory" ? updateForSubCategory : 
    e.target.name === "statusOfRequest" ? updateForStatusOfRequest : null
    
    updateByRowId(rowIdValue, props.stateProps, null, null, valueForUpdate, null, errorOnDB, numberOfItem)
  }
 
  //  const moduleInProgress = <Modal show={props.modal} hide={props.modal}>
//    Module Still Not Built</Modal> 
   const loader = table.length === 0 || table === undefined ? 
   <Modal show={props.stateProps.hideModal} hide={props.modal}><Spinner2 /></Modal> : null
  
   const errorModal = <Modal show={error} 
    hide={props.modal}>User has no authorization to read data or no data in the DB.</Modal>

    return (
    <div className="table-reports">
      {errorModal}
      {props.stateProps.selectedActivity && error === false ? loader : null}
      {/* {props.stateProps.selectedActivity === 4 ? moduleInProgress : null} */}
      < TableReport
        updateCustomInputRowsValueHandler={updateCustomInputRowsValueHandler}
        customInputRowsValue={customInputRowsValue}
        updateCustomSelectRowsValueHandler={updateCustomSelectRowsValueHandler}
        customSelectRowsValue={customSelectRowsValue}
        subcategorySelectField={subcategorySelectField}
        categorySelectField={categorySelectField}
        refreshReports={props.refreshReports}
        
        blockNextButton={blockNextButton}
        counter={counter}
        nextPageLoad={nextPageLoad}
        previousPageLoad={previousPageLoad}
        stateProps={props}
        deleteRowHandler={deleteRowHandler} 
        tableData={table}
        onClick={props.onClick}
        onClickRowId={onClickRowId}
        errorOnDB={errorOnDB}
        />         
    </div>
  ) 
}

export default SelectReport;