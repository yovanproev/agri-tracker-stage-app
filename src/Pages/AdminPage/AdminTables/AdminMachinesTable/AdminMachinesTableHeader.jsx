import React from "react"

import TableFilter from 'react-table-filter';
import "react-table-filter/lib/styles.css";
import "./AdminMachinesTable.css"

const AdminMachinesTableHeader = ({showHoursOnlyPerMachine}) => {
   
   return (
    <thead className='bgvi'>
      <TableFilter>
          <th className="first-col-header" key = {Math.random() * 1000}>Machine</th> 
          {!showHoursOnlyPerMachine ? <th key = {Math.random() * 1000}>Attached Machinery</th> : null}
          {!showHoursOnlyPerMachine ? <th key = {Math.random() * 1000}>Farm</th> : null}
          {!showHoursOnlyPerMachine ? <th key = {Math.random() * 1000}>Product</th> : null}
          {!showHoursOnlyPerMachine ? <th key = {Math.random() * 1000}>Job Description</th> : null}
          <th key = {Math.random() * 1000}>Hours spent on activity</th> 
          {/* <th key = {Math.random() * 1000}>% of total hours spent</th> */}
          <th key = {Math.random() * 1000}>Total fuel spent</th> 
          {/* <th key = {Math.random() * 1000}>Liters spent times %</th>  */}
          <th key = {Math.random() * 1000}>Average fuel spent</th> 
         </TableFilter>
    </thead>
   )
}

export default AdminMachinesTableHeader;