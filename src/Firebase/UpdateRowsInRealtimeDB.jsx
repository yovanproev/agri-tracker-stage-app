import { firebase_db, firebase_db_fuelConsump, firebase_db_machineReg, 
         firebase_db_maintenance, firebase_db_workHours, firebase_db_purchaseRequests,
        firebase_db_authenticatedUsers } from "./Firebase.utils";

export const updateByRowId = (rowId, props, numberOfEmployee, numberOfJob, updates, activity, 
  errorOnDB, numberOfItem) => {

  return new Promise((resolve, reject)=>{
    let db = firebase_db.ref();
    
    const database = props.selectedActivity === 0 ? firebase_db_fuelConsump : 
    props.selectedActivity === 1 ? firebase_db_machineReg : 
    props.selectedActivity === 2 ? firebase_db_maintenance : 
    props.selectedActivity === 4 || activity === 4 ? firebase_db_purchaseRequests : null

    const firstChild = props.selectedActivity === 0 ? "fuelConsumptionInput/" : 
    props.selectedActivity === 1 ? "machineRegistrationInput/" : 
    props.selectedActivity === 2 ? "maintenanceAndRepairsInput/" :
    props.selectedActivity === 4 || activity === 4 ? "purchaseRequests/" : null

    if (props.selectedActivity === 3) {
      firebase_db_workHours.orderByChild("id")
      .endAt(rowId).limitToLast(1).once('value').then((snapshot)=>{
       const randomKey = Object.keys(snapshot.val())
       db.child("workingHoursInput/"+ randomKey + "/" + numberOfEmployee + "/" + numberOfJob).update(updates)
       resolve(snapshot.val())
      }).catch(err => {
        reject(err)
      })
     } 
     else if (props.selectedActivity === 4 && activity === null) {
       database.orderByChild('id')
        .endAt(numberOfItem).limitToLast(1).once('value').then((snapshot)=>{
        
          if (snapshot.val() === null || snapshot.val() === undefined) {errorOnDB()}  
          else {const randomKey = Object.keys(snapshot.val())
            const items = 'items'
            db.child(firstChild + randomKey + "/" + items + "/" + rowId).update(updates)
         resolve(snapshot.val()) 
        }
        }).catch(err => {
          errorOnDB()
          reject(err)
        })
     }
     else if (props.selectedActivity !== 4 && activity === 4) {
      database.orderByChild('id')
       .endAt(rowId).limitToLast(1).once('value').then((snapshot)=>{
         if (snapshot.val() === null || snapshot.val() === undefined) {errorOnDB()}  
         else {const randomKey = Object.keys(snapshot.val())
           const items = 'items'
           numberOfItem.map(keys => 
           db.child(firstChild + randomKey + "/" + items + "/" + keys).update(updates))
          resolve(snapshot.val()) 
        }
       }).catch(err => {
         errorOnDB()
         reject(err)
       })
    }
       else {
        database.orderByChild('id')
        .endAt(rowId).limitToLast(1).once('value').then((snapshot)=>{
          if (snapshot.val() === null || snapshot.val() === undefined) {errorOnDB()}  
          else {const randomKey = Object.keys(snapshot.val())
          db.child(firstChild + randomKey).update(updates)
          resolve(snapshot.val()) 
        }
        }).catch(err => {
          errorOnDB()
          reject(err)
        })
     }
  })
}

export const updateAuthUsers = (updates, stateProps) => {
  return new Promise((resolve, reject)=>{
    let db = firebase_db.ref();
    
    firebase_db_authenticatedUsers.orderByChild("email")
        .endAt(stateProps.email).limitToLast(1).once('value').then((snapshot)=>{
          const randomKey = Object.keys(snapshot.val())
          
          let newObject = {};
          let newPostKey = firebase_db_authenticatedUsers.push().key;
          newObject[newPostKey] = updates;

          const posted = "posted"
          const updatingCondition = stateProps.outputTable || stateProps.adminSection ? newObject : updates

          db.child('authenticatedUsers/' + randomKey + "/" + posted).update(updatingCondition)
          resolve(snapshot.val())
        }).catch(err => {
          reject(err)
        })
     })
}
