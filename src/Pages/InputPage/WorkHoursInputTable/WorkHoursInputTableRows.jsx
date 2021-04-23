import React, { useEffect, useState, useMemo } from 'react'
import { getSelectFields } from "../../../Firebase/FetchCollectionsFromFirestore"
import "./WorkHoursInputTable.css"

export const WorkHoursInputTableRows = ({jobActivities, index, tableRowsHandler, localState}) => {
  const [employeesRows, setEmployeesRows] = useState([]);
    
  useMemo(() => 
    getSelectFields(5).then(res => {
     const data = res.filter(operators => operators.typeOfWorker === localState.selectedTypeOfHoursName);
        return setEmployeesRows(data)}), [localState.selectedTypeOfHoursName]);
    
    const [workHourReg, setWorkHourReg] = useState([]);

    // names of employees checked   
    const [ checkedFields, updateCheckedFields ] = useState('')
    
    const checkboxHandler = (e, name, rowId) => {
      
      const { id , checked} = e.target;
       updateCheckedFields({
        ...checkedFields, 
        [id] : name})
        if(checked === false){ 
          workHourReg[rowId].workHours = [{ type: jobActivities[index]?.name, time: ""}];
          setWorkHourReg(workHourReg);
        } 
        tableRowsHandler(workHourReg)
     }

    let i = 0;
    
    useEffect(()=>{
      let employees =[];
      
      do {
        employees.push({name: employeesRows[i]?.name, 
          workHours:[{ type: jobActivities[i]?.name, time: ""}]});
        i++;
      } while (i < employeesRows.length);
      setWorkHourReg(employees)
    }, [employeesRows, i, jobActivities])

     
    const handleInputChange = (e, rowId, columnId) => {
      const { value } = e.target;
      const workHours = (workHourReg[rowId] || {}).workHours || [];
      if(!workHours[columnId]){
         workHours.push({type: jobActivities[columnId]?.name, time: parseFloat(value) });
      } else {
        workHours[columnId].time = value;
      }
      // console.log("Handle input: ", value, workHours);
      setWorkHourReg({
           ...workHourReg,
          //  workHours,
         });
         tableRowsHandler(workHourReg)
      };
       
      // disable handler
      const [ check, setCheck ] = useState(true)
      const disableHandler = (e) => {
        const { id, checked } = e.target;
        setCheck({
          ...check,
          [id] : checked,
        });
      };

    const column = (rows, columnindex) =>  
      <td key={rows+columnindex}> 
        <label style={{display:"grid"}}>
          <input type="number" className="jobs-input"
          step="0.1" id={rows+columnindex} 
          value={(((workHourReg[rows] || {}).workHours || {})[columnindex-1] || {}).time || "" }
          disabled={!check[rows]}   
          onChange={(e) => {handleInputChange(e, rows, columnindex - 1)}}
              />
        </label>
      </td>
 
  const columns = (rows) => {
    return index.map((selectedJobs, id) => {
       if (id === 0) {
          return null
        } else { 
          return column(rows, id + 1)
        }
      })
    }
    
    return(
        <tbody key={index}>
            {employeesRows.map((employee, rowId) => 
            <tr key={rowId} className='even'>
                <td className="first-col-rows"> 
                    {employee.name}
                </td>
                <td key={rowId}>
                    <label>
                        <input type="checkbox" name="checkboxName" value="on" 
                        onChange={(e) => {disableHandler(e); checkboxHandler(e, employee.name, rowId)}} 
                        id={rowId}  
                        style={{width:"20px", height:"20px", margin: "auto 20px"}}/>
                    </label>
                </td>
                
                <td > 
                    <label style={{display:"grid"}}>
                        <input 
                        disabled={!check[rowId]}   
                        type="number" id={rowId}
                        value={(((workHourReg[rowId] || {}).workHours || {})[0] || {}).time || "" }
                        className="jobs-input"
                        step="0.1" 
                        onChange={(e) => {handleInputChange(e, rowId, 0)}}/>
                    </label>
                </td>
                {columns(rowId)}
                <td >
                {parseFloat((((workHourReg[rowId] || {}).workHours || [])
                .reduce((prevVal,currentVal) => isNaN(prevVal) ? 0 : parseFloat(prevVal) 
                + parseFloat(currentVal.time), 0)) || 0)
                .toFixed(1)
                }
                </td>
                </tr>
            )}  
        </tbody>
    )
}
   
          
    
