import React, { useEffect, useState } from 'react';

import "./UsersData.scss"
// import BackDrop from "../../../ReusableElements/Backdrop/Backdrop"
import BackButton from "../../../ReusableElements/BackButton/BackButton"
import Table from "../../../ReusableElements/ReactTableLibrary/Table"
import { RenderForAdmin } from '../../../RoleBasedAccessControl/RoleBasedAccessControl';
import { getAllUsers } from "../../../Firebase/FetchCollectionsFromFirestore"
import { updateUsersInFirestore } from '../../../Firebase/SetAndUpdateCollectionsInFirestore';

const UsersData = (props) => {
   // get users table
  const [ user, setUser ] = useState([])
  
  useEffect(() => {
    getAllUsers(props).then(resolve => {
      setUser(resolve)
    })
    return () => {
      if (!props.stateProps.currentUser) {
     setUser(null)
    }
  }
}, [props, props.stateProps.currentUser])
    
  // get the table row number 
  const [ rowIdValue, setRowId ] = useState(undefined);
  const onClickRowId = (rowId) => {
    if (rowId.id !== undefined) setRowId(rowId.id)
    else return 0
  }

  // get the name of the Role from Firebase based on the id of the row
  const [ role, setRole ] = useState([])
  const getRoleValue = (roleValue) => {
    setRole(roleValue)
  }

  // post the new role to Firebase
  useEffect(() => {
    const rolesPosting = (rowId) => {
      updateUsersInFirestore(rowId, role)
    }
   if (rowIdValue !== undefined) rolesPosting(rowIdValue)
  }, [role, rowIdValue])

  return (
    <div>
     {/* <BackDrop />  */}
     <div className='users-data'>
        <RenderForAdmin 
       stateProps={props.stateProps}>
         <BackButton onClick={props.onClick}/>
       <Table
          stateProps={props.stateProps}
          data={user}
          getRoleValue={getRoleValue}
          onClick={onClickRowId}
          currentRole={role}
        />  
       </RenderForAdmin>
      </div> 
    </div>
  )
}
  
export default UsersData;