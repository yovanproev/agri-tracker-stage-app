import { users, machines, attachedMachines, location, product,
         employees, jobDescriptions, technicians, projects,
         typeOfWorkOnTractors, typeOfStaff, spendingOrPurchaseOfFuel, 
         jobDescriptionsTractors, jobsWithAMachine, suppliers, 
        categoryOfMaterials, subCategoryOfMaterials, supplierOfFuel} from './Firebase.utils';

export async function getAllUsers(props) {
  const snapshot = await users.get();
  let arr = []
  snapshot.forEach((data) => {
     const tableData = data.data()
    if (props.stateProps)
    arr.push(tableData)
  })
  return arr
}
 
export async function getSelectFields(selectField) {
  
  const field = [selectField]?.slice(-1)[0];
  
  const selectionFields = [null, machines, attachedMachines, location, product, employees,
  location, jobDescriptionsTractors, typeOfWorkOnTractors, technicians, typeOfStaff, projects,
  jobDescriptions, spendingOrPurchaseOfFuel, jobsWithAMachine, suppliers, categoryOfMaterials, 
  subCategoryOfMaterials, supplierOfFuel]
  
  const selectionField = selectionFields[field]
  
  const snapshot = await selectionField?.get();
  let arr = []
  snapshot?.forEach((data) => {
     const tableData = data.data()
    // console.log(data.id, "=>", data.data())
    if (selectField)
    arr.push(tableData)
  })
  return arr
}