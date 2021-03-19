import { users, machines, attachedMachines, location, product,
  employees, jobDescriptionsTractors, typeOfWorkOnTractors, jobDescriptions, 
  technicians, projects, jobsWithAMachine, typeOfStaff, spendingOrPurchaseOfFuel,
  suppliers, categoryOfMaterials, subCategoryOfMaterials, supplierOfFuel } from './Firebase.utils';

export function updateUsersInFirestore(rowId, role) {
  users.orderBy("id").startAt(rowId).limit(1).get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
      // console.log(doc.id, " => ", doc.data());
      const randomKey = doc.id; 
       users.doc(randomKey).update({
            role: role
       })
    })
  })
}

export async function getLastIdForUsersInFirestore() {
  const snapshot = await users.get();
  let arr = []
  snapshot.forEach((data) => {
     const tableData = data.data().id
     arr.push(tableData)
  })
  const lastId = Math.max(...arr)
  return lastId
}

export async function updateSelectFieldsInFirestore(selectField, newEntry, newSubCategory, hideModal) {
   
  const selectionFields = [null, machines, attachedMachines, location, product, employees,
      location, jobDescriptionsTractors, typeOfWorkOnTractors, technicians, typeOfStaff, projects,
      jobDescriptions, spendingOrPurchaseOfFuel, jobsWithAMachine, suppliers, categoryOfMaterials, 
      subCategoryOfMaterials, supplierOfFuel]
      
      const selectionField = selectionFields[selectField]  

  const snapshot = await selectionField.get();
    let arr = []
    snapshot.forEach((data) => {
       const tableData = data.data().id
      if (selectField)
      arr.push(tableData)
    })
  const lastId = Math.max(...arr)

  const category = selectField === 5 ? 
  {id: lastId + parseInt(1),
  name: newEntry,
  typeOfWorker: newSubCategory} : 

  selectField === 12 || selectField === 14 ? 
   {id: lastId + parseInt(1),
    name: newEntry,
    costCenter: newSubCategory} : 

    selectField !== 12 && selectField !== 5 && selectField !== 14 ? 
   {id: lastId + parseInt(1),
    name: newEntry} : null

  selectionField.doc().set({
   ...category
  })
  hideModal()
}

  

  
