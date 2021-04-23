import React, { useEffect, useState } from 'react';

import "./SelectionFieldsUpdate.scss"
import SelectField from "./SelectField/SelectField"
import BackButton from "../../../ReusableElements/BackButton/BackButton"
import Table from "../../../ReusableElements/ReactTableLibrary/Table"

import { getSelectFields } from "../../../Firebase/FetchCollectionsFromFirestore"
import { updateSelectFieldsInFirestore } from '../../../Firebase/SetAndUpdateCollectionsInFirestore';
import { deleteByRowId } from '../../../Firebase/DeleteRowsInFirestore';
import { attachImagetoStorage } from "../../../Firebase/FetchAndUpdateImagesFromStorage"

import Modal from '../../../ReusableElements/Modal/Modal';
import Spinner2 from '../../../ReusableElements/Spinners/Spinner2';
import { updateAuthUsers } from '../../../Firebase/UpdateRowsInRealtimeDB';
import { getDateAndTime } from '../../InputPage/DBObjectElements/GetDateTime';

const SelectionFieldsUpdate = (props) => {
  // console.log(props)
  const [ selectFieldId, setSelectFielId ] = useState('')

  const [ categoryOfSelection, setCategoryOfSelection ] = useState([])

  const [ newImage, setNewImage ] = useState('')
  const [ imageName, setImageName ] = useState('')

  const onChangeHandlerForImage = (file, imageName) => {
     setNewImage(file)
     setImageName(imageName)
  }

  const [ newEntry, setNewEntry ] = useState('')
  const onChangeHandler = (value) => {
   setNewEntry(value)
  }

  useEffect(() => {
    
    getSelectFields(selectFieldId).then(resolve => {
      setCategoryOfSelection(resolve)}) 
      
 }, [selectFieldId])

  const [ newSubEntry, setNewSubEntry ] = useState('')
  const onChangeHandlerForSubEntry = (value) => {
    setNewSubEntry(value)
  }

  const [ uploadDone, updateUploadDone ] = useState(false)

  const onClickAttachImage = () => {
    updateProgressBar(true)
    attachImagetoStorage(selectFieldId, newImage, imageName, hideModal)
    
  }
  const deleteRowHandler = (rowId) => {
    const rows = categoryOfSelection.filter((row) => row.id !== rowId);
    deleteByRowId(rowId, selectFieldId)
    setCategoryOfSelection(rows) 
  }

  const [ progressBar, updateProgressBar ] = useState(false)
  
  const clearInputFileds = () => {
  setNewEntry("")
  setNewSubEntry("")
  setImageName("")
  setNewImage("")
  }

  const hideModal = () => {
    updateProgressBar(false)
    updateUploadDone(true)
    
  getSelectFields(selectFieldId).then(resolve => {
    setCategoryOfSelection(resolve)}) 
  }
  
  const hideEntryRecordedModal = () => {
    updateUploadDone(false)
  }

  const recordTrace = () => {
    updateAuthUsers({ addedRow: newEntry + ", " + newSubEntry + ", " + getDateAndTime()}, 
      props.stateProps)
  }

   const loadingModal = <Modal show={progressBar} 
    hide={hideModal}><Spinner2 /></Modal> 

  const entryRecordedModal = <Modal show={uploadDone} 
  hide={hideEntryRecordedModal} onClick={() => hideEntryRecordedModal()}>
    Your entry has been recorded.</Modal> 

    return (
      <div>
        {loadingModal}
        {entryRecordedModal}
        <div className='select-fields'>
          <BackButton onClick={props.onClick}/>
          <SelectField onChange={setSelectFielId} value={selectFieldId}/>
          <Table
              stateProps={props.stateProps}
              selectFieldToModify={selectFieldId}
              data={categoryOfSelection}
              onDelete={deleteRowHandler}
          /> 
          <label className="form-check-label">
          <input type="text" className="form-control" placeholder="name" value={newEntry} 
          onChange={(e) => onChangeHandler(e.target.value)}/>
          </label>
          {(selectFieldId !== 5 && selectFieldId !== 12 && selectFieldId !== 1 && selectFieldId !== 2 
          && selectFieldId !== 14) ? 
          <button type="submit" className="btn btn-success select-field-button" 
          onClick={() => {updateSelectFieldsInFirestore(selectFieldId, newEntry, newSubEntry, hideModal); 
            clearInputFileds(); recordTrace(); }}
          >Submit new field</button> : null } 
          
          {selectFieldId === 5 || selectFieldId === 12 || selectFieldId === 14 ? 
          <div style={{margin: "20px 0"}}>
          <label className="form-check-label">
          <input type="text" className="form-control" value={newSubEntry} placeholder="subcategory" 
          onChange={(e) => onChangeHandlerForSubEntry(e.target.value)}/>
          </label>
          <button type="submit" className="btn btn-success  select-field-button" 
          onClick={() => {updateSelectFieldsInFirestore(selectFieldId, newEntry, newSubEntry, hideModal); 
            clearInputFileds(); recordTrace(); }}
          >Submit new field</button> 
          </div> : null}

          {selectFieldId === 1 || selectFieldId === 2 ? 
          <div className="image-section">
          <label htmlFor="p_file">
          <input  type="file" className="form-control-file" defaultValue={newImage} placeholder="subcategory" 
          onChange={(e) => onChangeHandlerForImage(e.target.files[0], e.target.files[0].name)}/>
          </label>
          <button type="submit" className="btn btn-success  select-field-button" 
          onClick={() => {updateSelectFieldsInFirestore(selectFieldId, newEntry, newSubEntry, hideModal); 
            onClickAttachImage(); clearInputFileds(); recordTrace(); }}
          >Submit new field</button> 
          <p style={{marginTop: "20px"}}>*The name of the new entry has to be identical with the 
          name of the file attached and the file has to be a .jpg file.</p>
          </div> : null}    
          
        </div> 
      </div>
  )
}
  
export default SelectionFieldsUpdate;