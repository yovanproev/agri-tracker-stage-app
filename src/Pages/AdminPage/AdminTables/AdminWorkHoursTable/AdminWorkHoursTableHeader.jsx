import React from "react"

import TableFilter from 'react-table-filter';
import "react-table-filter/lib/styles.css";
import "./AdminWorkHoursTable.css"

const AdminWorkHoursTableHeader = ({datesOfWork}) => {
   
   return (
    <thead className='bgvi'>
      <TableFilter>
         <th className="first-col-header" key = {Math.random() * 1000}>Employees</th>
         {datesOfWork.map(x => 
         <th key = {Math.random() * 1000} filterkey="date" className="cell" 
            casesensitive={'true'} showsearch={'true'}>{x}
         </th>)}
         <th key = {Math.random() * 1000}>Total for selected period</th>
      </TableFilter>
    </thead>
   )
}

export default AdminWorkHoursTableHeader;