import { firebase_db, firebase_db_fuelConsump, firebase_db_machineReg, 
         firebase_db_maintenance, firebase_db_workHours, firebase_db_purchaseRequests } from "./Firebase.utils";

export const deleteByRowId = (rowId, props, numberOfEmployee, numberOfJob, numberOfItem, parentId) => {
  return new Promise((resolve, reject)=>{
    let db = firebase_db.ref();
    
    const database = props.stateProps.selectedActivity === 0 ? firebase_db_fuelConsump : 
    props.stateProps.selectedActivity === 1 ? firebase_db_machineReg : 
    props.stateProps.selectedActivity === 2 ? firebase_db_maintenance : 
    props.stateProps.selectedActivity === 4 ? firebase_db_purchaseRequests : null

    const firstChild = props.stateProps.selectedActivity === 0 ? "fuelConsumptionInput/" : 
    props.stateProps.selectedActivity === 1 ? "machineRegistrationInput/" : 
    props.stateProps.selectedActivity === 2 ? "maintenanceAndRepairsInput/" :
    props.stateProps.selectedActivity === 4 ? "purchaseRequests/" : null

    if (props.stateProps.selectedActivity === 3) {
      firebase_db_workHours.orderByChild("id")
      .endAt(parentId).limitToLast(1).once('value').then((snapshot)=>{
       const randomKey = Object.keys(snapshot.val())
       const hoursPerEmployee = "hoursPerEmployee"

       if (Object.keys(Object.values(snapshot.val())[0].hoursPerEmployee).length === 1) {
        db.child("workingHoursInput/"+ randomKey).remove()}
       else db.child("workingHoursInput/"+ randomKey + "/" + hoursPerEmployee + "/" + numberOfEmployee + "/" + numberOfJob).remove()
       resolve(snapshot.val())
      }).catch(err => {
        reject(err)
      })
     }
     else if (props.stateProps.selectedActivity === 4) {
      firebase_db_purchaseRequests.orderByChild("id")
      .endAt(numberOfItem).limitToLast(1).once('value').then((snapshot)=>{
       const randomKey = Object.keys(snapshot.val())
       const items = "items"
       
       if (Object.keys(Object.values(snapshot.val())[0].items).length === 1) {
         db.child("purchaseRequests/"+ randomKey).remove()}
       else db.child("purchaseRequests/"+ randomKey + "/" + items + "/" + rowId).remove()
       resolve(snapshot.val())
      }).catch(err => {
        reject(err)
      })
     }
     else {
      database.orderByChild("id")
        .endAt(rowId).limitToLast(1).once('value').then((snapshot)=>{
          const randomKey = Object.keys(snapshot.val())
          db.child(firstChild + randomKey).remove()
          resolve(snapshot.val())
        }).catch(err => {
          reject(err)
        })
     }
  })
}
