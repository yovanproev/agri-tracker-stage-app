import React, { useState, useEffect } from "react"

import "./ActivityBubble.css"
import FuelConsumptionImage from "../../Assets/gasStation.jpg";
import MachineRegistrationImage from "../../Assets/tractor.jpg";
import MaintenanceImage from "../../Assets/maintenance.jpg";
import WorkingHoursImage from "../../Assets/workinghours.png"
import PurchaseRequest from "../../Assets/purchaseRequest.png"

const ActivityBubble = (props) => {
  const [ distance, upgradeDistance ] = useState("");
  const [ scroll, updateScroll ] =useState("")
  
  const stateProps = props.stateProps
  
  useEffect(() => {
    if (stateProps.adminMode !== true) {updateScroll(true)}
   return() => {
      updateScroll(false)
   }
  }, [stateProps.adminMode])

 let onScroll = () => {
   if (scroll === true)
    window.addEventListener('scroll', function scrollHandler () {
     const distanceToTop = document.body.getBoundingClientRect().top;
    upgradeDistance(distanceToTop)
   })
 }

  const handleClick = () => {
  props.onClick(props.id);
  }

  return (
    <button onClick={handleClick}
     onScroll={stateProps.outputTable !== true || stateProps.inputForms !== true ? onScroll() : null} 
       className="activity-bubble">
        <span className="span-img">
          {(distance < 0 && distance > -17 && props.id === 0) ? <img alt='' src={FuelConsumptionImage} className="image-scroll"/> : 
          (distance < -17 && distance > -34 && props.id === 1) ? <img alt='' src={MachineRegistrationImage} className="image-scroll"/> :
          (distance < -34 && distance > -51 && props.id === 2) ? <img alt='' src={MaintenanceImage} className="image-scroll"/> :
          (distance < -51 && distance > -68 && props.id === 3) ? <img alt='' src={WorkingHoursImage} className="image-scroll"/> : 
          (distance < -68 && distance > -85 && props.id === 4) ? <img alt='' src={PurchaseRequest} className="image-scroll"/> : props.children}
        </span>
    </button>
  )
}

export default ActivityBubble;