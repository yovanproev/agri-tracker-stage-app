import React from 'react'
import "./AdminMachinesTable.css"

export const AdminMachinesTableRows = ({data, stateProps, fuelForComparison, showHoursOnlyPerMachine}) => {
  
  const object1 = {};
  let result = data?.reduce(function(prevValue, nextValue) {
     let key = !showHoursOnlyPerMachine ? 
      nextValue.machine + "-" + nextValue.farmLocation + "-" + nextValue.attachedMachinery : 
      nextValue.machine

      if(!object1[key]) {
        object1[key] = Object.assign({}, nextValue)
        prevValue.push(object1[key]);
      } else {
        object1[key].hoursSpentOnLastActivity += parseFloat(nextValue?.hoursSpentOnLastActivity); 
        }
        return prevValue;
  }, []);
  
  const reducedToUniqueMachine = [...new Set(data.map(machine => machine.machine))]; 
  const reducedToUniqueLocation = [...new Set(data.map(location => location.farmLocation))]; 
  const reducedToUniqueAttachedMachinery = [...new Set(data.map(attachedMachinery => attachedMachinery.attachedMachinery))]; 
  
 // console.log(data, "data") // pocetnite 6 objekti, machine registration modulut, po masina, 
    //attachedmachinery, location, product, jobDescription
  // console.log(result, "result") // 5 objekti, podeleni po masina i lokacija. Ova e od machine reg modulut.
  //console.log(fuelForComparison, "fuelForComparison") // objekti deka so spending fuel 
  //prikazano zbirno po masina i lokacija. Ova e od fuel cons.modulut 
  
  let hoursPerMachine =[]
    
  for (let j = 0; j < reducedToUniqueMachine.length; j++) {
    if (showHoursOnlyPerMachine === false) {
      for (let k = 0; k < reducedToUniqueAttachedMachinery.length; k++) {
        for (let i = 0; i < reducedToUniqueLocation.length; i++) {
          data.map((element, id) => {
            if (element.machine === reducedToUniqueMachine[j]) {
               if (element.attachedMachinery === reducedToUniqueAttachedMachinery[k]) {
                 if (element.farmLocation === reducedToUniqueLocation[i]) {
                  const obj = Object.assign({}, element);
                  obj.percentages = (element?.hoursSpentOnLastActivity / result[id]?.hoursSpentOnLastActivity) * 100 
                  return hoursPerMachine.push(obj)
                 }
              }
            }
          return null  
          })
        }
      }
    } else {
      data.map((element, id) => {
        if (element.machine === reducedToUniqueMachine[j]) {
          const obj = Object.assign({}, element);
          obj.percentages = (element?.hoursSpentOnLastActivity / result[id]?.hoursSpentOnLastActivity) * 100 
          return hoursPerMachine.push(obj)
        }
      return null  
      })
    }
  }

 return(
        <tbody key={Math.random() *1000}>
            {hoursPerMachine.map((object, rowId) => 
            <tr key={object.id} className='even'>
                <td className="first-col-rows"> {object.machine} </td>
               {!showHoursOnlyPerMachine ? <td >{object.attachedMachinery}</td> : null}
               {!showHoursOnlyPerMachine ? <td >{object.farmLocation}</td> : null}
               {!showHoursOnlyPerMachine ? <td >{object.product}</td> : null}
               {!showHoursOnlyPerMachine ? <td >{object.machinesJob}</td> : null}
                <td >{object.hoursSpentOnLastActivity}</td>
                
                <td>{fuelForComparison.map(machine => {
                    if (machine.machine === object.machine && machine.location === object.farmLocation 
                      && machine.attachedMachinery === object.attachedMachinery) 
                    return parseFloat(Math.abs(machine.liters)).toFixed(1)  + " Lit." 
                   else return null}) 
                }</td>
                
                <td>{fuelForComparison.map(machine => {
                    if (machine.machine === object.machine && machine.location === object.farmLocation 
                      && machine.attachedMachinery === object.attachedMachinery) return (object.hoursSpentOnLastActivity / Math.abs(machine.liters)).toFixed(2)
                   else return null})}</td>
            </tr>
            )}  
        </tbody>
    )
}
   
          
    
