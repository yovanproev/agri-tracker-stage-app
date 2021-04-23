import React, { useEffect, useState } from 'react';

import './ManagementReports.css';

import { TableHeaderAdmin } from './TableHeaderAdmin/TableHeaderAdmin'

// import { ExportCSV } from './ExcelExport/ExcelExport'
import Table from "../../../ReusableElements/ReactTableLibrary/Table"
import Modal from "../../../ReusableElements/Modal/Modal"
import Spinner2 from "../../../ReusableElements/Spinners/Spinner2"

import BackButton from '../../../ReusableElements/BackButton/BackButton';
import Calendar from '../../../ReusableElements/Calendar/Calendar';
import { getFilteredDataForExport } from '../../../Firebase/FetchFilteredDataForExportFromRealtimeDB';
import { addZero } from '../../InputPage/DBObjectElements/GetDateTime';
import AdminWorkHoursTable from './AdminWorkHoursTable/AdminWorkHoursTable';
import AdminMachinesTable from './AdminMachinesTable/AdminMachinesTable';

const ManagementReports = (props) => {
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)
  const [ nameOfModule, setName ] = useState(null)

  const [ dataPaginatedByDate, updateDataPaginatedByDate ] = useState([]) 
  const [ fuelForComparison, updateFuelForComparison ] = useState([]) 

  const [ startingDate, updateStartingDate ] = useState([])
  const [ endDate, updateEndDate ] = useState([])
  
  const fetchFilteredDateForExport = (startingDate, endDate) => {
   updateStartingDate(startingDate)
   updateEndDate(endDate)
  }

  const hideModal = () => { setError(false) }

  const [ showHoursOnlyPerMachine, updateShowHoursOnlyPerMachine ] = useState(false)
  
  useEffect(() => {
    setName(props.stateProps.stateProps.adminActivity[props.stateProps.stateProps.selectedActivity].name)
    
    const getStartingDate = () => {
      const startingDay = startingDate?.length !== 0 ? addZero(startingDate?.getDate()) : null
      const startingMonth = startingDate?.length !== 0 ? addZero(startingDate?.getMonth()+1) : null
      const startingYear = startingDate?.length !== 0 ? addZero(startingDate?.getFullYear()) : null
        return startingDay + "-" + startingMonth + "-" + startingYear
    }

    const getEndDate = () => {
      const endDay = endDate?.length !== 0 ? addZero(endDate?.getDate()) : null
      const endMonth = endDate?.length !== 0 ? addZero(endDate?.getMonth()+1) : null
      const endYear = endDate?.length !== 0 ? addZero(endDate?.getFullYear()) : null
        return endDay + "-" + endMonth + "-" + endYear
    }
    
    if (endDate !== null) {getFilteredDataForExport(getStartingDate(), getEndDate(), props.stateProps)
      .then(fullData => {
        let fullDataArray=[]
        
          Object.keys(fullData).forEach((key)=>{
            fullDataArray.push(fullData[key]);
            const onlyFuelConsumption = props.stateProps.stateProps.selectedActivity === 1 ? 
            fullDataArray.filter(machine => machine.machine) : 
            props.stateProps.stateProps.selectedActivity === 2 ? 
            fullDataArray.slice(-1)[0] : fullDataArray
                         
            const object = {}; 

            if (props.stateProps.stateProps.selectedActivity === 2) {
              let fuelForMachinesComparison = 
                fullDataArray[0].filter(machine => machine.machine).reduce(function(prevValue, nextValue) {
                   let key = !showHoursOnlyPerMachine ? 
                    nextValue.machine + '-' + nextValue.location + '-' + nextValue.attachedMachinery :
                    nextValue.machine           

                    if(!object[key]) {
                      object[key] = Object.assign({}, nextValue); // create a copy of next value
                      prevValue.push(object[key]);
                    } else {
                      object[key].liters += nextValue.liters 
                    }
                    return prevValue;
                }, []);
                updateFuelForComparison(fuelForMachinesComparison)
                setLoading(false)
            }

            if (!showHoursOnlyPerMachine) {
             let result = onlyFuelConsumption.reduce(function(prevValue, nextValue) {

                let key = props.stateProps.stateProps.selectedActivity === 1 ? 
                nextValue.machine + '-' + nextValue.attachedMachinery + '-' + nextValue.location : 
                props.stateProps.stateProps.selectedActivity === 2 ? 
                nextValue.machine + '-' + nextValue.attachedMachinery + '-' + 
                nextValue.location + '-' + nextValue.product + '-' + nextValue.machinesJob :
                props.stateProps.stateProps.selectedActivity === 3 ? 
                nextValue.machine + '-' + nextValue.attachedMachinery + '-' + 
                nextValue.jobDescription + '-' + nextValue.maintenanceOrRerairs : 
                props.stateProps.stateProps.selectedActivity === 4 ? nextValue.date 
                + '-' + nextValue.nameOfEmployee : null

                if(!object[key]) {
                  object[key] = Object.assign({}, nextValue); // create a copy of next value
                  prevValue.push(object[key]);
                } else {
                  if (props.stateProps.stateProps.selectedActivity === 1) {
                    object[key].liters += nextValue.liters }
                  else if (props.stateProps.stateProps.selectedActivity === 2) {
                    object[key].hoursSpentOnLastActivity -= nextValue.hoursSpentOnLastActivity}
                  else if (props.stateProps.stateProps.selectedActivity === 3) {
                    object[key].costOfTechnician += nextValue.costOfTechnician
                    object[key].workedHours += nextValue.workedHours}
                  else if (props.stateProps.stateProps.selectedActivity === 4) {
                    object[key].manHours += nextValue.manHours || 0}
                  }
                       
                return prevValue;
              }, []);
              updateDataPaginatedByDate(result)
              setLoading(false)
            }
            else {
            const object1 = {};
             let result = onlyFuelConsumption.reduce(function(prevValue, nextValue) {
                let key = props.stateProps.stateProps.selectedActivity === 2 && showHoursOnlyPerMachine ? 
                nextValue.machine : null

                if(!object1[key]) {
                  object1[key] = Object.assign({}, nextValue); // create a copy of next value
                  prevValue.push(object1[key]);
                } else {
                  if (props.stateProps.stateProps.selectedActivity === 2) {
                    object1[key].hoursSpentOnLastActivity -= nextValue.hoursSpentOnLastActivity}
                  else return 0
                  }
                return prevValue;
              }, []);
             updateDataPaginatedByDate(result)
            setLoading(false)
           }
          })
      }).catch(err => {
            setError(true)
            setLoading(false)
      })
    }
  }, [endDate, props.stateProps, startingDate, showHoursOnlyPerMachine])
 
 const loadingModal = <Modal show={loading} 
    hide={hideModal}><Spinner2 /></Modal> 
  const errorModal = <Modal show={error} 
  hide={hideModal}>No records in the selected time period. Please select different period.</Modal> 

  return (
    <div className="table-report">
      {loadingModal}
      {errorModal}
      <BackButton onClick={props.onClick}/>
      <TableHeaderAdmin>{nameOfModule}</TableHeaderAdmin>
          <div style={{border: "solid 3px", padding: "10px", margin: "15px"}}>
            <h5>Choose a date</h5>
           <div style={{display: "inline-flex"}}> 
             <Calendar onChange={fetchFilteredDateForExport} stateProps={props.stateProps.stateProps}/>
           </div>
            {/* <ExportCSV  csvData={excelData} 
            fileName={nameOfModule} /> */}
           </div>
           <div>
           {props.stateProps.stateProps.selectedActivity === 2 ? 
             <button type="button" className="btn btn-success"
               onClick={() => updateShowHoursOnlyPerMachine(!showHoursOnlyPerMachine)}
               >{!showHoursOnlyPerMachine ? "Show hours per Machine" : "Show hours per product"}
               </button> : null}
           </div>
      
        {props.stateProps.stateProps.selectedActivity === 2 ? 
        <AdminMachinesTable 
          showHoursOnlyPerMachine={showHoursOnlyPerMachine}
          stateProps={props.stateProps.stateProps}
          data={dataPaginatedByDate}
          fuelForComparison={fuelForComparison}
          /> : null}

        {props.stateProps.stateProps.selectedActivity === 4 ?  
        <AdminWorkHoursTable 
            stateProps={props.stateProps.stateProps}
            data={dataPaginatedByDate}
            /> : null}
         

          {props.stateProps.stateProps.selectedActivity !== 4 && 
          props.stateProps.stateProps.selectedActivity !== 2 ? 
          <Table
            stateProps={props.stateProps.stateProps}
            data={dataPaginatedByDate}
            /> : null }
      
    </div>
  )
}

export default ManagementReports;