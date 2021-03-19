import React, { useEffect, useState } from 'react'
import { getSelectFields } from '../../../../Firebase/FetchCollectionsFromFirestore';
import "./AdminWorkHoursTable.css"

export const AdminWorkHoursTableRows = ({data}) => {
    const [employeesRows, setEmployeesRows] = useState([]);
    
    useEffect(()=>{
      getSelectFields(5).then(res => setEmployeesRows(res))
      
    }, [])
    
    const reducedToUniqueDate = [...new Set(data.map(date => date.date))];  
    
    const nameOfEmployee = "nameOfEmployee";
    const dateOfWork = "date";

    let result = data.reduce((prevValue, nextValue) => {
      if (!prevValue[nextValue[nameOfEmployee]]) prevValue[nextValue[nameOfEmployee]] = {};
        [].concat(nextValue[dateOfWork]).forEach(subEl => {
            if (!prevValue[nextValue[nameOfEmployee]][subEl]) prevValue[nextValue[nameOfEmployee]][subEl] = [];
            prevValue[nextValue[nameOfEmployee]][subEl].push(nextValue);
        });
        return prevValue;
    }, {});
  
    // Person 1 -> [date1]: {manHours1}
    //          -> [date2]: {manHours2}
    
    // Person 2 -> [date1]: {manHours1}
    //          -> [date2]: {manHours2}
    
    const column = (rowId, date, columnId, employee) => {
      return <td key={rowId+columnId}> 
                {result[employee] ? 
                +parseFloat(((result[employee][date] || [])
                [rowId !== 0 ? 0 : rowId] || [])?.manHours).toFixed(1) 
                || parseInt(0) : null}
              </td>
    }

    const totalColumn = (rowId, employee) => {
      let total = 0;
      reducedToUniqueDate?.map((date) => {
        return ((result[employee] || [])[date] || [])?.forEach((key) => {
         total += key?.manHours || 0
      })
    }) 
      return <td key={rowId}> 
                {parseFloat(total).toFixed(1)}
             </td>
    }

 return(
        <tbody key={Math.random() *1000}>
            {employeesRows.map((employee, rowId) => 
              <tr key={employee.id} className='even'>
                  <td className="first-col-rows"> 
                      {employee.name}
                  </td>
                {reducedToUniqueDate.map((date, columnId) => {
                  return column(rowId, date, columnId, employee.name) })
                }
                {totalColumn(rowId, employee.name)}
              </tr>
            )}  
        </tbody>
    )
}
   
          
    
