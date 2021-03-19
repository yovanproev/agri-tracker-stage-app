import React from 'react'
import Table from 'react-bootstrap/Table';

import PurchaseRequestInputTableHeader from "./PurchaseRequestInputTableHeader"
import "./PurchaseRequestInputTable.css"
import { PurchaseRequestInputTableRows } from './PurchaseRequestInputTableRows';

const PurchaseRequestInputTable = ({purchaseRequestTableHandler, localState, addItem}) => {
    
     return (
        <div className="table-div-input">
        <Table striped bordered hover responsive>
            <PurchaseRequestInputTableHeader />
            <PurchaseRequestInputTableRows localState={localState} addItem={addItem}
            purchaseRequestTableHandler={purchaseRequestTableHandler} /> 
        </Table>
        </div>
    )
}

export default PurchaseRequestInputTable