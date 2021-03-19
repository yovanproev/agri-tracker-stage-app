import { machines, attachedMachines, location, product,
  employees, jobDescriptionsTractors, typeOfWorkOnTractors, jobDescriptions, 
  technicians, projects, jobsWithAMachine, typeOfStaff, spendingOrPurchaseOfFuel,
  suppliers, categoryOfMaterials, subCategoryOfMaterials, supplierOfFuel } from './Firebase.utils';

export function deleteByRowId (rowId, selectField) {
  const selectionFields = [null, machines, attachedMachines, location, product, employees,
    location, jobDescriptionsTractors, typeOfWorkOnTractors, technicians, typeOfStaff, projects,
    jobDescriptions, spendingOrPurchaseOfFuel, jobsWithAMachine, suppliers, categoryOfMaterials, 
    subCategoryOfMaterials, supplierOfFuel]
    
    const selectionField = selectionFields[selectField]  

 selectionField.orderBy("id").startAt(rowId).limit(1).get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
      // console.log(doc.id, " => ", doc.data());
      const randomKey = doc.id;
      selectionField.doc(randomKey).delete()
      })
  })
}



