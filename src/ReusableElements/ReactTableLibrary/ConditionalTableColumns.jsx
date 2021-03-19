import { SelectColumnFilter } from './TableFilters';

export const conditionalTableColumns = (props) => {
  
  return props.stateProps.selectedActivity === 0 && props.stateProps.outputTable ? fuelConsumptionColumns : 
  props.stateProps.selectedActivity === 1 && props.stateProps.outputTable ? machineRegitrationColumns : 
  props.stateProps.selectedActivity === 2 && props.stateProps.outputTable ? maintenanceAndRepairsColumns : 
  props.stateProps.selectedActivity === 3 && props.stateProps.outputTable ? workingHoursInputColumns : 
  props.stateProps.selectedActivity === 4 && props.stateProps.outputTable ? purchaseRequestsInputColumns : 
  props.stateProps.selectedActivity === 1 && props.stateProps.adminSection ? fuelManagementColumns : 
  props.stateProps.selectedActivity === 2 && props.stateProps.adminSection ? machineRegistrationManagementColumns :
  props.stateProps.selectedActivity === 3 && props.stateProps.adminSection ? maintenanceAndRepairsManagementColumns :
  props.stateProps.selectedActivity === 4 && props.stateProps.adminSection ? workingHoursManagementColumns :
  props.stateProps.outputTable === false && props.stateProps.inputForms === false ? usersAuthentication : null;
}

const fuelConsumptionColumns = [
  {
    Header: '#',
    accessor: "id",
  },
  {
    Header: 'Fuel Registration',
    accessor: "fuelChoice",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
    },
  {
    Header: 'Machine',
    accessor: "machine",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
    }, 
    { 
      Header: 'Attached Machinery',
      accessor: "attachedMachinery",
      disableSortBy: true,
      Filter: SelectColumnFilter,
      filter: 'equals',
     },
  {
    Header: 'Location',
    accessor: "location",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Liters',
    accessor: 'liters',
  },
  {
    Header: 'Price per liter',
    accessor: 'pricePerLiter',
  },
  {
    Header: 'Kilometers',
    accessor: 'kilometers',
  },
  {
    Header: 'Fuel Supplier',
    accessor: 'supplierOfFuel',
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Delivery Note',
    accessor: 'deliveryNote',
  },
  {
    Header: 'Tank #',
    accessor: 'tankNumber',
  },
  {
    Header: 'Liters missing',
    accessor: "litersMissing",
  },
  {
    Header: 'Operator',
    accessor: "operator",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Tank residual-liters',
    accessor: "tankResidual",
  },
  {
    Header: 'Date',
    accessor: "date",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Time of entry',
    accessor: 'timeOfEntry',
  },
]


const machineRegitrationColumns = [
  {
    Header: '#',
    accessor: "id",
  },
  {
    Header: 'Machine',
    accessor: "machine",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
    }, 
  { 
    Header: 'Attached Machinery',
    accessor: "attachedMachinery",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
   },
  {
    Header: 'Farm Location',
    accessor: "farmLocation",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Product',
    accessor: "product",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Job Description',
    accessor: "machinesJob",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Kilometers',
    accessor: 'kilometers',
  },
  {
    Header: 'Operator',
    accessor: "operator",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Hours spent on last Activity',
    accessor: 'hoursSpentOnLastActivity',
  },
  {
    Header: 'Date',
    accessor: "date",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Time of entry',
    accessor: 'timeOfEntry',
  },
]

const maintenanceAndRepairsColumns = [
  {
    Header: '#',
    accessor: "id",
  },
  {
    Header: 'Machine',
    accessor: "machine",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  }, 
  { 
    Header: 'Attached Machinery',
    accessor: "attachedMachinery",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
    },
    {
    Header: 'Worked hours',
    accessor: 'workedHours',
  },
  {
    Header: 'Location',
    accessor: "location",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Technician',
    accessor: "technician",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Maint./Rep.',
    accessor: "maintenanceOrRerairs",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Job Description',
    accessor: "jobDescription",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  // {
  //   Header: 'Man hours',
  //   accessor: 'manHours',
  // },
  {
    Header: 'Cost Of Technician',
    accessor: 'costOfTechnician',
  },
  {
    Header: 'Acitivity Explained',
    accessor: 'explainTheActivity',
  },
  {
    Header: 'Date',
    accessor: "date",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Time of entry',
    accessor: 'timeOfEntry',
  },
]

export const workingHoursInputColumns = [
  {
    Header: '#',
    accessor: "id",
  },
  {
    Header: 'Employee',
    accessor: "nameOfEmployee",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  }, 
  {
    Header: 'Type Of Hours',
    accessor: "typeOfHours",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Location',
    accessor: "location",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Project',
    accessor: "project",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Job Description',
    accessor: "jobDescription",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Cost Center',
    accessor: "costCenter",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Man hours',
    accessor: 'manHours',
  },
  {
    Header: 'Date',
    accessor: "date",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Time of entry',
    accessor: 'timeOfEntry',
  },
]

export const purchaseRequestsInputColumns = [
  {
    Header: '#',
    accessor: "id",
  },
  {
    Header: 'Supplier',
    accessor: "supplier",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Description',
    accessor: "itemDescription",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Quantity',
    accessor: "itemQuantity",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Price',
    accessor: "itemPrice",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Purpose Of Purchase',
    accessor: 'itemPurpose',
  },
   {
    Header: 'Status',
    accessor: "statusOfRequest",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Date',
    accessor: "date",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Time of entry',
    accessor: 'timeOfEntry',
  },
  {
    Header: 'PR #',
    accessor: "PRNumber",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Invoice #',
    accessor: "invoiceNum",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Category Of Materials',
    accessor: "category",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Subcategory Of Materials',
    accessor: "subcategory",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  }
]

export const usersCollection = [
  {
    Header: 'Username',
    accessor: "displayName",
    }, 
 { 
    Header: 'E-mail',
    accessor: "email",
  },
   { 
      Header: 'Role',
      accessor: "role",
      disableSortBy: true,
      Filter: SelectColumnFilter,
      filter: 'equals',
   }, 
]

const fuelManagementColumns = [
  {
    Header: 'Machine',
    accessor: "machine",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
    }, 
    { 
      Header: 'Attached Machinery',
      accessor: "attachedMachinery",
      disableSortBy: true,
      Filter: SelectColumnFilter,
      filter: 'equals',
     },
  {
    Header: 'Location',
    accessor: "location",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Total Liters Spent',
    accessor: 'liters',
  },
]

const machineRegistrationManagementColumns = [
  {
    Header: 'Machine',
    accessor: "machine",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
    }, 
    { 
      Header: 'Attached Machinery',
      accessor: "attachedMachinery",
      disableSortBy: true,
      Filter: SelectColumnFilter,
      filter: 'equals',
     },
  {
    Header: 'Farm',
    accessor: "farmLocation",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Product',
    accessor: "product",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Job Description',
    accessor: "machinesJob",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Total Hours/KM Spent',
    accessor: 'hoursSpentOnLastActivity',
  },
  {
    Header: '% of total spent hours',
    accessor: 'percentages',
  },
]

const maintenanceAndRepairsManagementColumns = [
  {
    Header: 'Machine',
    accessor: "machine",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  }, 
  { 
    Header: 'Attached Machinery',
    accessor: "attachedMachinery",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
    },
    {
    Header: 'Location',
    accessor: "location",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Technician',
    accessor: "technician",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Maint./Rep.',
    accessor: "maintenanceOrRerairs",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Job Description',
    accessor: "jobDescription",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Cost Of Technician',
    accessor: 'costOfTechnician',
  },
  {
    Header: 'Worked hours',
    accessor: 'workedHours',
  },
   
]

export const workingHoursManagementColumns = [
  {
    Header: 'Employee',
    accessor: "nameOfEmployee",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Location',
    accessor: "location",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  }, 
  {
    Header: 'Type Of Hours',
    accessor: "typeOfHours",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Project',
    accessor: "project",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    
    Header: "date",
    accessor: 'manHours',
  },
]

export const selectionFieldsCollection = (selectFieldToModify) => {
  return [
    {
      Header: selectFieldToModify === 1 ? 'Machines' : 
      selectFieldToModify === 2 ? 'Attached Machinery' :
      selectFieldToModify === 3 ? 'Location' :
      selectFieldToModify === 4 ? 'Product' :
      selectFieldToModify === 5 ? 'Employees' :
      selectFieldToModify === 7 ? "Machine Maintenance Job Description" :
      selectFieldToModify === 9 ? 'Technicians' :
      selectFieldToModify === 11 ? 'Projects' :
      selectFieldToModify === 12 ? 'Man Jobs' :
      selectFieldToModify === 14 ? 'Machine Jobs' :
      selectFieldToModify === 15 ? 'Supplier' :
      selectFieldToModify === 16 ? 'Category of materials' :
      selectFieldToModify === 17 ? 'Subcategory of materials' :
      selectFieldToModify === 18 ? 'Supplier Of Fuel' : "Please select a field to update",
      accessor: "name",
    },
    {
      Header: selectFieldToModify === 1 ? "N/A" : 
      selectFieldToModify === 2 ? "N/A" :
      selectFieldToModify === 3 ? "N/A" :
      selectFieldToModify === 4 ? "N/A" :
      selectFieldToModify === 5 ? 'Type of Worker' :
      selectFieldToModify === 6 ? "N/A" :
      selectFieldToModify === 7 ? "N/A" :
      selectFieldToModify === 8 ? "N/A" :
      selectFieldToModify === 9 ? "N/A" :
      selectFieldToModify === 10 ? "N/A" :
      selectFieldToModify === 11 ? "N/A" : 
      selectFieldToModify === 12 ? "Cost Center" :
      selectFieldToModify === 13 ? "N/A" :
      selectFieldToModify === 14 ? "Cost Center" : "N/A",
      accessor: selectFieldToModify === 5 ? 'typeOfWorker' : 
      selectFieldToModify === 12 ? "costCenter" : 
      selectFieldToModify === 14 ? "costCenter" : null
    }, 
  ]
}

export const usersAuthentication = [
  {
    // Make an expander cell
    Header: "Click to see entries by sign In",  // () => null - No header
    id: 'expander', // It needs an ID
    Cell: ({ row }) => (
      // Use Cell to render an expander for each row.
      <span {...row.getToggleRowExpandedProps()}>
        {row.isExpanded ? <i className="fas fa-arrow-circle-down fa-3x"></i> : 
        <i className="fas fa-arrow-alt-circle-right fa-2x"></i>}
      </span>
    ),
  },
  {
    Header: 'Email',
    accessor: "email",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Date of sign in',
    accessor: "signInDate",
    disableSortBy: true,
    Filter: SelectColumnFilter,
    filter: 'equals',
  },
  {
    Header: 'Time of sign in',
    accessor: "signInTime",
    // disableSortBy: true,
    // Filter: SelectColumnFilter,
    // filter: 'equals',
  }
]