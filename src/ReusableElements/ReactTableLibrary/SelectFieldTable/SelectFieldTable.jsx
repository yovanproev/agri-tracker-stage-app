import React, { useState, useMemo } from "react"
import { getSelectFields } from "../../../Firebase/FetchCollectionsFromFirestore"
import { updateAuthUsers } from "../../../Firebase/UpdateRowsInRealtimeDB"
import {fetchStatusOfPurchase} from "../../../LocalData/InputFormsData"
import { getDateAndTime } from "../../../Pages/InputPage/DBObjectElements/GetDateTime"

import "./SelectFieldTable.css"

const SelectFieldTable = ({onChange, onFocus, id, stateProps, nameOfStatus,  
categoryOfMaterials, selectOptions, selectIdentity, name}) => {
  const statusOfPurchase = fetchStatusOfPurchase()
  
  const [ filteredSubCategory, updateFilteredSubCategory ] = useState([])
// console.log(categoryOfMaterials)
  useMemo(() => 
  getSelectFields(17).then(res => {
   const data = res.filter(materials => materials.category === categoryOfMaterials);
      return updateFilteredSubCategory(data)}), [categoryOfMaterials]);
  
  const arrayOfZeroValueOnSelectField = ["Select a machine", "Select attached machinery", "Select location",
  "Select a product", "Select an operator", "Select a farm", "Select a job description", "Select activity",
  "Select a Technician", "Select Type of Hours", "Select a Project", "", "Select type of entry", "Select a job",
"Select a supplier", "Select Category", "Select Subcategory", "Supplier of Fuel"]

  const defaultValue = arrayOfZeroValueOnSelectField[selectIdentity - 1]

  const filteringByCriteria = selectIdentity === 16 ? selectOptions : 
  selectIdentity === 17 ? filteredSubCategory : statusOfPurchase
   
  const recordTrace = () => {
    updateAuthUsers({ PurchaseRequestStatus: id + ", " + nameOfStatus + ", " + getDateAndTime()}, 
      stateProps)
    }

  return (
      <div >
        <select className="select-div-table"
          onChange={(e) => onChange(e)}
          // value={value ? value : ""}
          name={name}
          onFocus={onFocus}
          onBlur={() => recordTrace()}
          id={id}
          
          >
          <option key={0} value={0}> {selectIdentity === 16 || selectIdentity === 17
          ? defaultValue : "Select status"} </option>
          {filteringByCriteria?.map((fields) => (
            <option key={fields.id} value={fields.id}>
            {fields.name} 
            </option>
            )) }
        </select>
      </div>
    )
  
}

export default SelectFieldTable;