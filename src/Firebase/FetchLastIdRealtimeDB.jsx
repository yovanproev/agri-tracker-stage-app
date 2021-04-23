import { firebase_db_fuelConsump, firebase_db_machineReg, 
         firebase_db_maintenance, firebase_db_workHours, firebase_db_purchaseRequests } from "./Firebase.utils";

export const getLastId = (props) => {
  return new Promise((resolve, reject)=>{
 
    const database = props.stateProps.selectedActivity === 0 ? firebase_db_fuelConsump : 
    props.stateProps.selectedActivity === 1 ? firebase_db_machineReg : 
    props.stateProps.selectedActivity === 2 ? firebase_db_maintenance : 
    props.stateProps.selectedActivity === 4 ? firebase_db_purchaseRequests : null

    if (props.stateProps.selectedActivity === 3) {
      firebase_db_workHours.limitToLast(1).once('value').then((snapshot)=>{
          let origin = snapshot.val() === null || snapshot.val() === undefined ? parseInt(0) : snapshot.val()
          if (origin !== 0) { 
          const hoursPerEmployees = Object.values(origin)[0].hoursPerEmployee
          const employeesKeys = +Object.keys(hoursPerEmployees).slice(-1)[0]
          const jobsValues = Object.values(origin)[0].hoursPerEmployee[employeesKeys]
          const lastObjectKey = +Object.keys(jobsValues).slice(-1)[0]
          const lastId = jobsValues[lastObjectKey].id
          // console.log(lastId) 
          resolve(lastId)
          } else return resolve(parseInt(0))
      }).catch(err => {
        reject(err)
      })
    }
    else if (props.stateProps.selectedActivity === 4) {
      firebase_db_purchaseRequests.limitToLast(1).once('value').then((snapshot)=>{
          let origin = snapshot.val() === null || snapshot.val() === undefined ? parseInt(0) : snapshot.val()
          if (origin !== 0) { 
            const lastKey = +Object.keys(Object.values(origin)[0].items).slice(-1)[0]
            const lastId = Object.values(origin)[0].items[lastKey].id
            //console.log(lastId)
            resolve(lastId)
          } else return resolve(parseInt(0))
      }).catch(err => {
        reject(err)
      })
    }
    else {
      database.orderByChild("id")
      .startAt(1).limitToLast(1).once('value').then((snapshot)=>{
        let lastId = snapshot.val()  === null || snapshot.val()  === undefined ? 
        parseInt(0) : Object.values(snapshot.val()).slice(-1)[0].id
        resolve(lastId)
      }).catch(err => {
        reject(err)
      })
      }
    })
}

export const getParentLastId = (props) => {
  return new Promise((resolve, reject)=>{
 
    if (props.stateProps.selectedActivity === 3) {
      firebase_db_workHours.limitToLast(1).once('value').then((snapshot)=>{
          let origin = snapshot.val() === null || snapshot.val() === undefined ? parseInt(0) : snapshot.val()
          if (origin !== 0) { 
          const lastId = Object.values(origin)[0].id
           resolve(lastId)
          } else return resolve(parseInt(0))
      }).catch(err => {
        reject(err)
      })
    } else if (props.stateProps.selectedActivity === 4) {
      firebase_db_purchaseRequests.limitToLast(1).once('value').then((snapshot)=>{
          let origin = snapshot.val() === null || snapshot.val() === undefined ? parseInt(0) : snapshot.val()
          if (origin !== 0) { 
            const lastId = Object.values(origin)[0].id
           // console.log(lastId)
             resolve(lastId)
          } else return resolve(parseInt(0))
      }).catch(err => {
        reject(err)
      })
    } else return 0
  })
}

export const getEmployeeRowLastId = (props) => {
  return new Promise((resolve, reject)=>{
 
    if (props.stateProps.selectedActivity === 3) {
      firebase_db_workHours.limitToLast(1).once('value').then((snapshot)=>{
          let origin = snapshot.val() === null || snapshot.val() === undefined ? parseInt(0) : snapshot.val()
          if (origin !== 0) { 
            const hoursPerEmployees = Object.values(origin)[0].hoursPerEmployee
            const lastInnerChildId = +Object.keys(hoursPerEmployees).slice(-1)[0]
           // console.log(lastInnerChildId) // 3ka vage a trebe 7
            resolve(lastInnerChildId)
          } else return resolve(parseInt(0))
      }).catch(err => {
        reject(err)
      })
    }
  })  
}


