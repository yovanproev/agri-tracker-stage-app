import emailjs from 'emailjs-com';

const emailSentForNewChildCreated = (purchaseRequest) => {
  const initialArray = []
 
  for (var i in purchaseRequest.items) {
      initialArray.push(purchaseRequest.items[i])
  }
  
  let finalObjectToSend = []

  finalObjectToSend.push({
    email: purchaseRequest.email,
    id: purchaseRequest.id,
    supplier: initialArray[0].supplier,
    itemDescription: initialArray.map(x => 
      x.itemDescription).toString(),
    itemQuantity: initialArray.map(x => 
      x.itemQuantity).toString(),
    itemPrice: initialArray.map(x => 
      x.itemPrice).toString(),
    itemPurpose: initialArray.map(x => 
      x.itemPurpose).toString(),
    date: purchaseRequest.date,
    operator: purchaseRequest.operator
  }) 
 
  const serviceIdDev = "service_73nupzv";
  const templateIdDev = "template_kdyzirc"
  const userIdDev = "user_lRQqXCJsRmCA8Wc2Ujn4d"

  emailjs.send(serviceIdDev, templateIdDev, finalObjectToSend[0], userIdDev)
  .then((result) => {
    // console.log(result.status)
  }, (error) => {
    // console.log(error)
  });
}

export default emailSentForNewChildCreated;