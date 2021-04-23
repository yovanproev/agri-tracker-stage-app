import React from "react"

import TableFilter from 'react-table-filter';
import "react-table-filter/lib/styles.css";
import "./PurchaseRequestInputTable.css"

const PurchaseRequestInputTableHeader = () => {
    
   return (
    <thead className='bgvi'>
      <TableFilter >
         <th className="cell" key = {Math.random() * 1000}>Item #</th>
         <th key = {Math.random() * 1000} className="cell">Description</th>
         <th key = {Math.random() * 1000} className="cell" >Quantity</th>
         <th key = {Math.random() * 1000} className="cell">Price</th>
         <th key = {Math.random() * 1000} className="cell">Total</th>
         <th key = {Math.random() * 1000} className="cell">Purpose of Purchase</th>
     </TableFilter>
    </thead>
   )
}

export default PurchaseRequestInputTableHeader;