import React, { useState, useMemo} from "react"
import { Multiselect } from 'multiselect-react-dropdown';
import { getSelectFields } from "../../../Firebase/FetchCollectionsFromFirestore";

const MultiSelectField = ({ onSelect, id, value, disableMultiSelectOption }) => {
 const [ selectedValue, updateSelectedValue ] = useState([])

 const [employeesRows, setEmployeesRows] = useState([]);
    
  useMemo(() => 
    getSelectFields(12).then(res => setEmployeesRows(res)), []);

  const onSelectHandler = (selectedList) => {
   onSelect(selectedList) 
   updateSelectedValue(selectedList)
  }

  const onRemove = (selectedList) => {
    onSelect(selectedList) 
    updateSelectedValue(selectedList) 
  }

  return (
    <Multiselect
    disable={disableMultiSelectOption}
    value={value}
    id={id}
    style={{multiselectContainer: 
      {width: "50%", margin: "auto", marginTop: "20px"}}}
    options={employeesRows} // Options to display in the dropdown
    selectedValues={selectedValue} // Preselected value to persist in dropdown
    onSelect={onSelectHandler} // Function will trigger on select event
    onRemove={onRemove} // Function will trigger on remove event
    displayValue="name" // Property name to display in the dropdown options
    />
  )
}

export default MultiSelectField;