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
 
  const serviceIdProd = "service_vf4sxdn";
  const templateIdProd = "template_o3ktl4q"
  const userIdProd = "user_lrqjAHvBjKfTMe8w7qCdJ"

  const serviceIdDev = "service_73nupzv";
  const templateIdDev = "template_kdyzirc"
  const userIdDev = "user_lRQqXCJsRmCA8Wc2Ujn4d"

  const serviceId = process.env.NODE_ENV === 'production'
  ? serviceIdProd : serviceIdDev
  const templateId = process.env.NODE_ENV === 'production'
  ? templateIdProd : templateIdDev
  const userId = process.env.NODE_ENV === 'production'
  ? userIdProd : userIdDev

  emailjs.send(serviceId, templateId, finalObjectToSend[0], userId)
  .then((result) => {
    // console.log(result.status)
  }, (error) => {
    // console.log(error)
  });
}

export default emailSentForNewChildCreated;