import React, { useState, useEffect } from "react"
import Modal from "../../ReusableElements/Modal/Modal";
import { updateByRowId } from "../../Firebase/UpdateRowsInRealtimeDB";
import emailjs from 'emailjs-com';

const RequestApprovals = (props) => {

  const [ error, setError ] = useState(false)

  const errorOnDB = () => {
    setError(true)
  }

  useEffect(() => {
    
    const initialObject = Object.values(props.purRequest).filter(x => 
      x.id === props.id)
    const onlyChosenPurchaseRequestKey = Object.keys(initialObject[0].items)
      
    const update = {statusOfRequest: props.decisionOnPurchase}
    updateByRowId(props.id, props.stateProps, null, null, update, 4, errorOnDB, onlyChosenPurchaseRequestKey)

    const onlyChosenPurchaseRequestValues = initialObject[0].items
    const initialArray = []
  
    for (var i in onlyChosenPurchaseRequestValues) {
        initialArray.push(onlyChosenPurchaseRequestValues[i])
    }
    
    let finalObjectToSend = []
  
    finalObjectToSend.push({
      statusOfRequest: props.decisionOnPurchase,
      email: initialObject[0].email,
      id: initialObject[0].id,
      supplier: initialArray[0].supplier,
      itemDescription: initialArray.map(x => 
        x.itemDescription).toString(),
      itemQuantity: initialArray.map(x => 
        x.itemQuantity).toString(),
      itemPrice: initialArray.map(x => 
        x.itemPrice).toString(),
      itemPurpose: initialArray.map(x => 
        x.itemPurpose).toString(),
      date: initialObject[0].date,
      operator: initialObject[0].operator
    }) 
    
    const serviceIdProd = "service_vf4sxdn";
    const templateIdProd = "template_47ode22"
    const userIdProd = "user_lrqjAHvBjKfTMe8w7qCdJ"

    const serviceIdDev = "service_73nupzv";
    const templateIdDev = "template_y9rfmaw"
    const userIdDev = "user_lRQqXCJsRmCA8Wc2Ujn4d"

    const serviceId = process.env.NODE_ENV === 'production'
    ? serviceIdProd : serviceIdDev
    const templateId = process.env.NODE_ENV === 'production'
    ? templateIdProd : templateIdDev
    const userId = process.env.NODE_ENV === 'production'
    ? userIdProd : userIdDev

    if (finalObjectToSend) {
        emailjs.send(serviceId, templateId, finalObjectToSend[0], userId)
        .then((result) => {}
        
        , (error) => { })
      }

  }, [props.decisionOnPurchase, props.id, props.purRequest, props.stateProps, props])

  const closeError = () => {
    setError(false)
  }

  const errorModal = <Modal show={error} 
  hide={closeError}>There is no Purchase request with that number.</Modal>

  return (
    <div style={{marginTop: "20px", textAlign: "center"}}>
      {errorModal}
      {props.decisionOnPurchase === "Approved" ? <h3>The request has been approved.</h3> :
      <h3>The request has been declined.</h3>}
      {props.decisionOnPurchase === "Approved" ? <h3><i 
      style={{background: "green", padding: "20px"}}
      className="fas fa-check fa-5x"></i></h3> :
      <h3><i className="fas fa-times-circle fa-5x"
      style={{background: "red", padding: "20px"}}></i></h3>}
  </div>
  )
}

export default RequestApprovals;