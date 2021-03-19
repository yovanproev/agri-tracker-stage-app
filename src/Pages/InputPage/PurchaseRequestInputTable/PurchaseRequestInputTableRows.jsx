import React, { useState } from 'react'
import "./PurchaseRequestInputTable.css"

export const PurchaseRequestInputTableRows = ({purchaseRequestTableHandler, localState, addItem}) => {

   const [itemDescription, setItemDescription] = useState([]);  
   
   const descriptionHandler = (e, key, rowId) => {
          
      const { value } = e.target;
      const changedItemDescription = [...itemDescription];
      let request = changedItemDescription[rowId] || {};
      
      request[key] = value;
      changedItemDescription[rowId] = request;
      
      setItemDescription(changedItemDescription);
      purchaseRequestTableHandler(itemDescription, rowId)
      };
      
   return(
        <tbody >
          {addItem.map((rows, id) => {
          return <tr key={id}>
            <td className="pur-req-rows">{id + 1}</td>
            <td className="pur-req-rows"> 
                <label style={{display:"grid"}}>
                    <input 
                    type="text" id={id+'-column-2'}
                    value={(itemDescription[id] || {})["description"] || ""}
                    className="pur-req-input"
                    onChange={(e) => {descriptionHandler(e, "description", id)}}
                    />
                </label>
            </td>
            <td className="pur-req-rows"> 
                <label style={{display:"grid"}}>
                    <input 
                      type="number" id={id+'-column-3'}
                      value={(itemDescription[id] || {})["quantity"] || ""}
                      className="pur-req-input"
                      onChange={(e) => {descriptionHandler(e, "quantity", id)}}
                    />
                </label>
            </td>
            <td className="pur-req-rows"> 
                <label style={{display:"grid"}}>
                    <input 
                    type="number" id={id+'-column-4'}
                    value={(itemDescription[id] || {})["price"] || ""}
                    className="pur-req-input"
                    onChange={(e) => {descriptionHandler(e, "price", id)}}
                    />
                </label>
            </td>
            <td className="pur-req-rows"> 
                { parseInt((itemDescription[id] || {})["price"] || 0) * 
                parseInt((itemDescription[id] || {})["quantity"] || 0)}
            </td>
            <td className="pur-req-rows"> 
                <label style={{display:"grid"}}>
                    <input 
                    type="text" id={id+'-column-5'}
                    value={(itemDescription[id] || {})["purpose"] || ""}
                    className="pur-req-input"
                    onChange={(e) => {descriptionHandler(e, "purpose", id)}}
                    />
                </label>
            </td> 
          </tr>  })}         
        </tbody>
    )
}
   
          
    
