import React from 'react'
import Table from 'react-bootstrap/Table';

import AdminWorkHoursTableHeader from "./AdminWorkHoursTableHeader"
import "./AdminWorkHoursTable.css"
import { AdminWorkHoursTableRows } from './AdminWorkHoursTableRows';

const AdminWorkHoursTable = ({data, stateProps}) => {
    // console.log(data)
    const reducedToUniqueDates = [...new Set(data.map(date => date.date))];  
    
     return (
        <div className="table-div-input">
        <Table striped bordered hover responsive>
            <AdminWorkHoursTableHeader datesOfWork={reducedToUniqueDates}/>
            {data.length !== 0 ?  
            <AdminWorkHoursTableRows 
             data={data}/> 
             : null}
        </Table>
        </div>
    )
}

export default AdminWorkHoursTable