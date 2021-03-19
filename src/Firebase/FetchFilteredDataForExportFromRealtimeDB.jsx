import { firebase_db_fuelConsump, firebase_db_machineReg, 
         firebase_db_maintenance, firebase_db_workHours, firebase_db_purchaseRequests} from "./Firebase.utils";

export const getFilteredDataForExport = (startingDate, endDate, props) => {
  return new Promise((resolve, reject)=>{
    
    const database = props.stateProps.selectedActivity === 0 && props.stateProps.outputTable ? firebase_db_fuelConsump : 
    props.stateProps.selectedActivity === 1 && props.stateProps.outputTable ? firebase_db_machineReg : 
    props.stateProps.selectedActivity === 2 && props.stateProps.outputTable ? firebase_db_maintenance : 
    props.stateProps.selectedActivity === 4 && props.stateProps.outputTable ? firebase_db_purchaseRequests :
    props.stateProps.selectedActivity === 1 && props.stateProps.adminSection ? firebase_db_fuelConsump : 
    props.stateProps.selectedActivity === 2 && props.stateProps.adminSection ? firebase_db_machineReg : 
    props.stateProps.selectedActivity === 3 && props.stateProps.adminSection ? firebase_db_maintenance : null

    function reformatDate(date) {
      return date.split('-').reverse() // format ["2021", "01", "25"]
  }

    if (startingDate !== "null-null-null" && endDate !== "null-null-null") { 
      if (props.stateProps.selectedActivity === 3 && props.stateProps.outputTable) {
        const queryParameter = +reformatDate(startingDate).toString().replace(/[,]/g, '')
        firebase_db_workHours.orderByChild("queryParameter")
        .startAt(queryParameter).once('value').then((snapshot)=>{
          let arr = []
          let secondArray = []
          let finalArr = []
          let origin = snapshot.val()
          Object.values(origin).forEach(child => {
              arr.push(Object.values(child.hoursPerEmployee))
          })
          secondArray.push([].concat(...arr))
          finalArr.push([].concat(...secondArray[0]))
          resolve(getFilteredArray(endDate, finalArr[0]))
        }).catch(err => {
            reject(err)
        })
      } else if (props.stateProps.selectedActivity === 4 && props.stateProps.outputTable) {
        const queryParameter = +reformatDate(startingDate).toString().replace(/[,]/g, '')
        firebase_db_purchaseRequests.orderByChild("queryParameter")
        .startAt(queryParameter).once('value').then((snapshot)=>{
          let arr = []
          let secondArray = []
          let origin = Object.values(snapshot.val())
          origin.forEach(child => {
              const childObject = Object.values(child.items || {}) 
              arr.push(childObject)
          })
            secondArray.push([].concat(...arr))
            resolve(getFilteredArray(endDate, secondArray[0]))
        }).catch(err => {
            reject(err)
        })
      }
      else if (props.stateProps.selectedActivity === 4 && props.stateProps.adminSection) {
        const queryParameter = +reformatDate(startingDate).toString().replace(/[,]/g, '')
        firebase_db_workHours.orderByChild("queryParameter")
        .startAt(queryParameter).once('value').then((snapshot)=>{
          let arr = []
          let secondArray = []
          let finalArr = []
          let origin = snapshot.val()
          Object.values(origin).forEach(child => {
              arr.push(Object.values(child.hoursPerEmployee))
          })
          secondArray.push([].concat(...arr))
          finalArr.push([].concat(...secondArray[0]))
          resolve(getFilteredArray(endDate, finalArr[0]))
        }).catch(err => {
          reject(err)
        })
      } 
      else if (props.stateProps.selectedActivity === 2 && props.stateProps.adminSection) {
        const queryParameter = +reformatDate(startingDate).toString().replace(/[,]/g, '')
          let mergeFuelAndMachineReg = []
          firebase_db_fuelConsump.orderByChild("queryParameter")
          .startAt(queryParameter).once('value').then((snapshot)=>{
            const initialArray = snapshot.val() === null ? [] : Object.values(snapshot.val())
             mergeFuelAndMachineReg.push(getFilteredArray(endDate, initialArray))
            })
            
            firebase_db_machineReg.orderByChild("queryParameter")
            .startAt(queryParameter).once('value').then((snapshot)=>{
              const initialArray = Object.values(snapshot.val())
              mergeFuelAndMachineReg.push(getFilteredArray(endDate, initialArray))
              resolve(mergeFuelAndMachineReg)
            }).catch(err => {
          reject(err)
        })
      }
       else {
        const queryParameter = +reformatDate(startingDate).toString().replace(/[,]/g, '')
        database.orderByChild("queryParameter")
        .startAt(queryParameter).once('value').then((snapshot)=>{
          const initialArray = Object.values(snapshot.val())
          resolve(getFilteredArray(endDate, initialArray))
          }).catch(err => {
            reject(err)
          })
      }
    }
  })
}
 
// Firebase doesn't allow querying the base with start and end parameter at the same time,
// so this function filters the array fetched from the starting date to the end of the base
// by filtering with the set end date
const getFilteredArray = (endDate, initialArray) => {
  
  const endDay = endDate.slice(0, 2)
  const endMonth = endDate.slice(3, 5) - 1    
  const endYear = endDate.slice(6, 10)   
    
  const sortByDate = (a, b) => {
   return new Date(reformatDate(b.date)) - new Date(reformatDate(a.date)); // show in descending order
  };

  function reformatDate(date) {
      return date.split('-').reverse() // format ["2021", "01", "25"], in order to be able to create Data object
  }
 
  let sortedDataByDate = initialArray.sort(sortByDate)

  const filteredDataByEndDate = [];
           
    for(const index in sortedDataByDate) {
        const obj = sortedDataByDate[index];
        const date = parseDate(obj.date);
  
        if(date <= new Date(endYear, endMonth, endDay))
         filteredDataByEndDate.push(obj);
    }

    function parseDate(dateStr) {
        const date = dateStr.split('-');
        const day = date[0];
        const month = date[1] - 1; //January = 0
        const year = date[2];
        return new Date(year, month, day); 
    }
    
   return filteredDataByEndDate;
}

