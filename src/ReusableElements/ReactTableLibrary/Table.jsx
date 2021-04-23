import React, { useEffect, useState, useCallback } from 'react';
import { Container } from 'reactstrap';
import TableContainer from './TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ReactTable.css"

import  { conditionalTableColumns, usersCollection, selectionFieldsCollection }  from "./ConditionalTableColumns"

const Table = (props) => {
  const [ tableColumns, setTableColumns ] = useState([])
  
  const [ tableBody, setTableBody ] = useState([])
    
  useEffect(() => {
    setTableColumns(conditionalTableColumns(props))
    if (props.stateProps.selectedActivity === 0 && props.stateProps.adminSection) setTableColumns(usersCollection);
    if (props.stateProps.selectedActivity === 5 && props.stateProps.adminSection)  setTableColumns(selectionFieldsCollection(props.selectFieldToModify)) 
    
    if (props.stateProps.selectedActivity === 4 && props.stateProps.adminSection === false) {
      setTableBody([].concat(...props.data))
    }
  }, [props])
  
  const renderRowSubComponent = 
  useCallback((rows) => (
      <pre style={{ fontSize: '10px' }}>
        <code><h6>{JSON.stringify({ postedEntries: rows?.original.posted }, null, 2)
        .replace(/[{}]/g, '').replace(/[""]/g, '')}</h6></code>
      </pre>
  ),[])

  return (
    <Container style={{ margin: "auto", whiteSpace: "nowrap"}} >
    {tableColumns ?  
    <TableContainer 
      updateCustomInputRowsValueHandler={props.updateCustomInputRowsValueHandler}
      customInputRowsValue={props.customInputRowsValue}
      updateCustomSelectRowsValueHandler={props.updateCustomSelectRowsValueHandler}
      customSelectRowsValue={props.customSelectRowsValue}   
      subcategorySelectField={props.subcategorySelectField}
      categorySelectField={props.categorySelectField}
      refreshReports={props.refreshReports}

      onClickRowId={props.onClickRowId}
      blockNextButton={props.blockNextButton}
      counter={props.counter}
      nextPageLoad={props.nextPageLoad}
      previousPageLoad={props.previousPageLoad}
      stateProps={props.stateProps}
      onDelete={props.onDelete}
      columns={tableColumns}
      data={props.stateProps.selectedActivity === 4 && props.stateProps.adminSection === false ? 
        tableBody : props.data}
      getRoleValue={props.getRoleValue}
      onClick={props.onClick}
      currentRole={props.currentRole}
      renderRowSubComponent={renderRowSubComponent}
      errorOnDB={props.errorOnDB}
      />
         : null} 
    </Container>
  );
};

export default Table;