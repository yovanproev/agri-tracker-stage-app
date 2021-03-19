import React from 'react';
import Backdrop from "../../ReusableElements/Backdrop/Backdrop"

import "./StartingPage.css"
import SignIn from "./SignIn/SignIn"
import SignUp from "./SignUp/SignUp"

  const startingPage = (props) => (
    
    <div className='sign-in-and-sign-up'>
    <Backdrop />  
      <SignIn setCredentialsHandler={props.setCredentialsHandler} stateProps={props.stateProps}
      postUserAuth={props.postUserAuth}/>
      <SignUp setCredentialsHandler={props.setCredentialsHandler} stateProps={props.stateProps}
      postUserAuth={props.postUserAuth}/>
      
    </div>
    
  )
  
  export default startingPage;