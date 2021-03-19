import { firebase_db_fuelConsump, firebase_db_machineReg } from "./Firebase.utils";

export const getTankResidual = (location) => {
  return new Promise((resolve, reject)=>{
 
    firebase_db_fuelConsump.orderByChild("location")
     .endAt(location).limitToLast(1).once('value').then((snapshot)=>{
       let lastLocation = snapshot.val()  === null || snapshot.val()  === undefined ? 
       parseInt(0) : Object.values(snapshot.val()).slice(-1)[0].tankResidual
       resolve(lastLocation)
     }).catch(err => {
      reject(err)
     })
 })
}

export const getLitersMissing = (location) => {
  return new Promise((resolve, reject)=>{
 
    firebase_db_fuelConsump.orderByChild("location")
     .endAt(location).limitToLast(1).once('value').then((snapshot)=>{
       let lastTankNumber = snapshot.val()  === null || snapshot.val()  === undefined ? 
       parseInt(0) : Object.values(snapshot.val()).slice(-1)[0].tankNumber
       resolve(lastTankNumber)
     }).catch(err => {
      reject(err)
     })
 })
}


export const workedHoursPerMachine = (machine) => {
  return new Promise((resolve, reject)=>{
 
    firebase_db_machineReg.orderByChild("machine")
     .endAt(machine).limitToLast(1).once('value').then((snapshot)=>{
       let lastHours = snapshot.val()  === null || snapshot.val()  === undefined ? 
       parseInt(0) : Object.values(snapshot.val()).slice(-1)[0].kilometers
      //  console.log("fetching selected machine last hours", lastHours)
       resolve(lastHours)
     }).catch(err => {
      reject(err)
     })
 })
}

