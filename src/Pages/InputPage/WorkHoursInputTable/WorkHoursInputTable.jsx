import React from 'react'
import Table from 'react-bootstrap/Table';

import WorkHoursInputTableHeader from "./WorkHoursInputTableHeader"
import "./WorkHoursInputTable.css"
import { WorkHoursInputTableRows } from './WorkHoursInputTableRows';

const WorkHoursInputTable = ({jobActivities, nameOfJobActivity, id, tableRowsHandler, localState}) => {
    
     return (
        <div className="table-div-input">
        <Table striped bordered hover responsive className="custom-table">
            <WorkHoursInputTableHeader 
            jobActivities={jobActivities}/>
            {jobActivities.length !== 0 ? <WorkHoursInputTableRows jobActivities={jobActivities} localState={localState}
            index={id} tableRowsHandler={tableRowsHandler} nameOfJobActivity={nameOfJobActivity}/> : null}
        </Table>
        </div>
    )
}

export default WorkHoursInputTable