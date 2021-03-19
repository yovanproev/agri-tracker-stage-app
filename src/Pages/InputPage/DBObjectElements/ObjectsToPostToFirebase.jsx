import { getDate, getDateAndTime, getTime } from "./GetDateTime";

function reformatDate(date) {
  return date.split("-").reverse(); // format ["2021", "01", "25"]
}

export const fuelConsumptionInputObject = (props) => {
  let object;
  const queryParameter = +reformatDate(props.date)
    .toString()
    .replace(/[,]/g, "");
  const toNegativeNumber = (num) => -Math.abs(num);

  props.selectedSpendingOrPurchaseId === 1
    ? (object = {
        id: props.lastId,
        fuelChoice: props.spendingOrPurchase,
        machine: props.selectedMachineName,
        attachedMachinery: props.selectedAttachedMachineryName,
        liters: toNegativeNumber(props.liters),
        kilometers: props.kilometersOnMachine,
        tankNumber: props.tankNum,
        location: props.selectedLocationName,
        operator: props.selectedOperatorName,
        date: props.date,
        tankResidual: props.tankResidual
          ? (
              +parseFloat(props.tankResidual) - +parseFloat(props.liters)
            ).toFixed(1)
          : parseInt(0),
        litersMissing:
          (
            +parseFloat(props.tankNum) - +parseFloat(props.lastTankNumber)
          ).toFixed(1) - +parseFloat(props.liters),
        timeOfEntry: getDateAndTime(),
        queryParameter: queryParameter,
      })
    : (object = {
        id: props.lastId,
        date: props.date,
        fuelChoice: props.spendingOrPurchase,
        operator: props.selectedOperatorName,
        supplierOfFuel: props.supplierOfFuel,
        liters: props.liters,
        tankNumber: props.tankNum,
        location: props.selectedLocationName,
        tankResidual: props.tankResidual
          ? (
              +parseFloat(props.tankResidual) + +parseFloat(props.liters)
            ).toFixed(1)
          : parseFloat(props.liters),
        deliveryNote: props.deliveryNote,
        timeOfEntry: getDateAndTime(),
        queryParameter: queryParameter,
      });
  return object;
};

export const machineRegistrationInputObject = (props) => {
  const queryParameter = +reformatDate(props.date)
    .toString()
    .replace(/[,]/g, "");
  let object = {
    id: props.lastId,
    machine: props.selectedMachineName,
    attachedMachinery: props.selectedAttachedMachineryName,
    farmLocation: props.selectedFarmName,
    product: props.selectedProductName,
    kilometers: +parseFloat(props.kilometersOnMachine).toFixed(1),
    operator: props.selectedOperatorName,
    machinesJob: props.machinesJobs,
    hoursSpentOnLastActivity: props.hoursSpentOnLastActivity
      ? (
          +parseFloat(props.hoursSpentOnLastActivity) -
          +parseFloat(props.kilometersOnMachine)
        ).toFixed(1)
      : parseInt(0),
    date: props.date,
    timeOfEntry: getDateAndTime(),
    queryParameter: queryParameter,
  };
  return object;
};

export const maintenanceAndRepairsInputObject = (props) => {
  const queryParameter = +reformatDate(props.date)
    .toString()
    .replace(/[,]/g, "");

  let object = {
    id: props.lastId,
    machine: props.selectedMachineName,
    attachedMachinery: props.selectedAttachedMachineryName,
    workedHours: +parseFloat(props.workedHours).toFixed(1),
    location: props.selectedLocationName,
    farmLocation: props.selectedFarmName,
    maintenanceOrRerairs: props.selectedMaintenanceName,
    explainTheActivity: props.explainTheActivity,
    technician: props.selectedTechnicianName,
    // manHours: props.manHours,
    costOfTechnician: +parseFloat(props.costOfTechnician).toFixed(1),
    jobDescription: props.selectedMacniheMaintenanceName,
    date: props.date,
    timeOfEntry: getDateAndTime(),
    queryParameter: queryParameter,
  };
  return object;
};

export const workingHoursInputObject = (props) => {
  let employeeNodes = {};
  for (
    let lengthOfEmployeeArray = 0;
    lengthOfEmployeeArray < props.nameOfEmployee?.length;
    lengthOfEmployeeArray++
  ) {
    const employees = props.nameOfEmployee.map((nameOfEmployee, employeeId) => {
      const jobsLength = props.selectedMSJobDescriptionId.length;
      const jobNodes = props.selectedMSJobDescriptionId.map(
        (jobDescription, jobId) => {
          let object1 = {
            id:
              props.lastId +
              jobId +
              employeeId +
              (jobsLength === 1 && jobsLength !== 2
                ? 0
                : employeeId + employeeId) -
              (jobsLength === 2 ? employeeId : 0),

            date: props.date,
            typeOfHours: props.selectedTypeOfHoursName,
            location: props.selectedLocationName,
            project: props.selectedProjectName,
            costCenter: jobDescription.costCenter,

            jobDescription: jobDescription.name,
            manHours:
              parseFloat(
                (props.manHours[employeeId].workHours[jobId] || []).time
              ) || parseInt(0),
            nameOfEmployee: nameOfEmployee,

            parentId: props.lastParentId,
            numberOfEmployee: props.employeeRowLastId + lengthOfEmployeeArray,
            numberOfJob: jobId,

            timeOfEntry: getDateAndTime(),
          };
          return object1;
        }
      );
      return jobNodes;
    });
    const keys1 = props.employeeRowLastId + lengthOfEmployeeArray;
    employeeNodes[keys1] = employees[lengthOfEmployeeArray];
  }

  const queryParameter = +reformatDate(props.date)
    .toString()
    .replace(/[,]/g, "");

  let obj = {
    date: props.date,
    id: props.lastParentId,
    hoursPerEmployee: employeeNodes,
    queryParameter: queryParameter,
  };
  return obj;
};

export const purcahseRequestsInputObject = (props, email) => {
  let childrenNodes = {};
  for (let i = 0; i < props.purchase?.length; i++) {
    const subChildrenNodes = props.purchase.map((items, index) => {
      // console.log(items)
      let arr = [];
      for (let i = 0; i <= index; i++) {
        arr.push(i);
      }
      let increaseIdForNextItem = arr.slice(-1)[0];

      return {
        supplier: props.supplier,
        statusOfRequest: "Pending",
        date: props.date,
        id: props.lastId + increaseIdForNextItem,
        itemDescription: items?.description,
        itemQuantity: items?.quantity,
        itemPrice: items?.price,
        itemPurpose: items?.purpose,
        timeOfEntry: getDateAndTime(),
        numberOfItem: props.lastParentId,
      };
    });

    const key = props.lastId + i;
    childrenNodes[key] = subChildrenNodes[i];
  }

  const queryParameter = +reformatDate(props.date)
    .toString()
    .replace(/[,]/g, "");

  let obj = {
    operator: props.selectedOperatorName,
    email: email,
    date: props.date,
    id: props.lastParentId,
    items: childrenNodes,
    queryParameter: queryParameter,
  };
  return obj;
};

export const usersAuthentication = (props) => {
  let object = {
    // name: props.currentUser?.displayName,
    email: props?.email,
    signInDate: getDate(),
    signInTime: getTime(),
  };
  return object;
};
