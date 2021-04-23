import React from 'react'
import Button from 'react-bootstrap/Button';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportCSV = ({csvData, fileName, stateProps}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const headerFuelReg = ["id", "fuelChoice", "machine", "attachedMachinery", "location", "liters",
        "kilometers", "supplierOfFuel", "deliveryNote", "pricePerLiter", "tankNumber", "litersMissing", 
        "operator", "tankResidual", "date", "timeOfEntry"];

        const headerMachineReg = ["id", "machine","attachedMachinery", "farmLocation", "product",
        "machinesJob", "kilometers", "operator", "hoursSpentOnLastActivity", "date", "timeOfEntry"];

        const headerMaintenace = ["id", "machine","attachedMachinery", "workedHours", "location", 
        "technician", "maintenanceOrRerairs", "jobDescription", "costOfTechnician", 
        "explainTheActivity", "date", "timeOfEntry"];

        const headerWorkHours = ["id", "nameOfEmployee", "typeOfHours", "location", "project",
        "jobDescription", "costCenter", "manHours", "date", "timeOfEntry"];

        const headerPurhaseRequests = ["id", "supplier", "itemDescription", "itemQuantity", "itemPrice", "itemPurpose", "statusOfRequest", 
        "category", "subcategory", "PRNumber", "invoiceNum", "date", "timeOfEntry"];
        
        
        const header = stateProps.outputTable && stateProps.selectedActivity === 0 ? headerFuelReg :
        stateProps.outputTable && stateProps.selectedActivity === 1 ? headerMachineReg :
        stateProps.outputTable && stateProps.selectedActivity === 2 ? headerMaintenace :
        stateProps.outputTable && stateProps.selectedActivity === 3 ? headerWorkHours : 
        stateProps.outputTable && stateProps.selectedActivity === 4 ? headerPurhaseRequests : null

        const ws = XLSX.utils.json_to_sheet(csvData, {header: header});
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button  style={{margin: "10px 10px"}} variant="warning" onClick={() => exportToCSV(csvData,fileName)}>Export to Excel</Button>
    )
}

