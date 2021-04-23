import React, { useState, useEffect } from "react"

import { fetchSelectFieldsToBeModified } from "../../../../LocalData/InputFormsData";
import "./SelectField.css"

const SelectField = ({onChange, value}) => {
  const [ fetchedData, updateFetchedData ] = useState([]);
  
  useEffect(() => {
    const filteredArray = fetchSelectFieldsToBeModified()
    .filter(noModifing => noModifing.selectionFieldToBeModified !== undefined)
    updateFetchedData(filteredArray)
 }, [])

  return (
      <div >
        <select className="select-div"
          onChange={(e) => onChange(parseInt(e.target.value))}
          value={value ? value : ""}>
          <option key={0} value={0}>
            Select a category to modify
           </option>
           {fetchedData.map((fields) => (
            <option key={fields.id} value={fields.id}>
            {fields.selectionFieldToBeModified ? fields.selectionFieldToBeModified : null} 
            </option>
            )) }
        </select>
      </div>
    )
  
}

export default SelectField;