import React, {Fragment} from 'react';
import './App.css';
import {
  Switch, Route,
  Redirect, BrowserRouter as Router 
} from "react-router-dom";

import Header from "./Header/Header"
import StartingPage from "./Pages/SignInSignUp/StartingPage"
import HomePage from './Pages/HomePage/HomePage';

import SelectActivity from './Pages/SelectActivity';

import { getPurchaseRequests, resetCounter } from "./Firebase/FetchDataFromRealtimeDB";
import { auth, createUserProfileDocument } from "./Firebase/Firebase.utils"
import { RenderForAdmin, RenderForManager, RenderForOperator } from './RoleBasedAccessControl/RoleBasedAccessControl';
import Modal from "./ReusableElements/Modal/Modal"
import axiosLocal from "./AxiosInput";
import {usersAuthentication} from "./Pages/InputPage/DBObjectElements/ObjectsToPostToFirebase"
import RequestApprovals from "./Pages/RequestApprovals/RequestApprovals"
import { fetchActivityPerMode, fetchAdminActivity } from './LocalData/InputFormsData';
import Footer from './Footer/Footer';

class App extends React.Component {
  state = {
      currentUser: null,
      inputMode: JSON.parse(sessionStorage.getItem( 'inputMode' )) || false,
      outputMode: JSON.parse(sessionStorage.getItem( 'outputMode' )) || false,
      homeMode: JSON.parse(sessionStorage.getItem( 'homeMode' )) !== null ? 
      JSON.parse(sessionStorage.getItem( 'homeMode' )) : true,
      inputForms: false,
      outputTable: false,
      adminMode: JSON.parse(sessionStorage.getItem( 'adminMode' )) || false,
      hideModal: false,
      unauthorizedFetchError: false,
      activityPerMode: fetchActivityPerMode(),
      adminActivity: fetchAdminActivity()
  } 
  
  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth && !this.state.logOutError) {
        const userRef = await createUserProfileDocument(userAuth);
      
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }, role: snapShot.data().role})
            if (snapShot.data().role === "Manager") {
            getPurchaseRequests(70, 10, this.state, this.errorOnDB)
            .then(purReq => {this.setState({purReq: Object.values(purReq)}) })}
          });
      }
      this.setState({ currentUser: userAuth})})
      this.setCredentialsHandler()
      this.expiredToken()
  }

  errorOnDB = () => { this.setState({unauthorizedFetchError: true}) }

  expiredToken = () => {
    if (new Date(this.state.expirationDate) <= new Date()) {
    this.setState({ 
    role: "Disabled", logOutError: true})
    auth.signOut() }
  }

  componentWillUnmount() {this.unsubscribeFromAuth()}

  modesHandler = (mode) => {
    const modesArray = ['homeMode', 'adminMode', 'inputMode', 'outputMode']
    this.setState({
      homeMode: modesArray[mode - 1] === 'homeMode' ? true : false, 
      adminMode: modesArray[mode - 1] === 'adminMode' ? true : false, 
      adminSection: modesArray[mode - 1] !== 'adminMode' ? false : undefined, 
      inputMode: modesArray[mode - 1] === 'inputMode' ? true : false, 
      inputForms: modesArray[mode - 1] !== 'inputMode' ? false : undefined, 
      outputMode: modesArray[mode - 1] === 'outputMode' ? true : false, 
      outputTable: modesArray[mode - 1] !== 'outputMode' ? false : undefined, 
      hideModal: modesArray[mode - 1] === 'adminMode' ||
                  modesArray[mode - 1] === 'inputMode' || 
                  modesArray[mode - 1] === 'outputMode' ? true : false,  
    })
    modesArray[mode - 1] === "homeMode" ? sessionStorage.setItem( 'homeMode', true ) : 
    sessionStorage.setItem( 'homeMode', false )
    modesArray[mode - 1] === "adminMode" ? sessionStorage.setItem( 'adminMode', true ) : 
    sessionStorage.setItem( 'adminMode', false )
    modesArray[mode - 1] === "inputMode" ? sessionStorage.setItem( 'inputMode', true ) : 
    sessionStorage.setItem( 'inputMode', false )
    modesArray[mode - 1] === "outputMode" ? sessionStorage.setItem( 'outputMode', true ) : 
    sessionStorage.setItem( 'outputMode', false )
   
  resetCounter();
 }

 refreshReports = () => {this.setState({outputMode: true, outputTable: true})}

 activityHandler = (e) => {
   this.setState({ selectedActivity: [e][0] })
   this.expiredToken();
  if (this.state.inputMode) {
  this.setState({
    inputForms: true, outputTable: false,
    adminSection: false
  })} else if (this.state.outputMode) {
  this.setState({
    inputForms: false, outputTable: true,
    adminSection: false
  })} else if (this.state.adminMode) {
    this.setState({
      inputForms: false, outputTable: false,
      adminSection: true
    })}
 }
 
  backButtonHandler = () => {
   this.setState({
     outputTable: false, inputForms: false,
     adminSection: false,
   })}

  hideModalHanlder = () => {
    this.setState({
      hideModal: !this.state.hideModal, outputTable: false,
      inputForms: false, adminSection: false,
      logOutError: false
    })}

  setCredentialsHandler = () => {
    const cookieData = document.cookie?.split(';');
    const expirationDate = cookieData[1]?.includes("expirationDate") ? cookieData[1]?.split('=')[1] : 
    cookieData[0]?.includes("expirationDate") ? cookieData[0]?.split('=')[1] : cookieData[2]?.split('=')[1]
    const tokenId = cookieData[1]?.includes("tokenId") ? cookieData[1]?.split('=')[1] : 
    cookieData[0]?.includes("tokenId") ? cookieData[0]?.split('=')[1] : cookieData[2]?.split('=')[1]
    const email = cookieData[1]?.includes("email") ? cookieData[1]?.split('=')[1] : 
    cookieData[0]?.includes("email") ? cookieData[0]?.split('=')[1] : cookieData[2]?.split('=')[1]
    
    this.setState({
    expirationDate: expirationDate,
    tokenId: tokenId, email: email,}) 
 }

  postUserAuth = () => {
    axiosLocal.post('/authenticatedUsers.json', usersAuthentication(this.state))
  }

  signOutHandler = () => {
    this.setState({ currentUser: null, adminMode: false, 
    outputMode: false, inputMode: false})
    sessionStorage.removeItem("inputMode")
    sessionStorage.removeItem("outputMode")
    sessionStorage.removeItem("adminMode")
    auth.signOut()}

   render() {
    const unauthorizedFetch = <Modal show={this.state.unauthorizedFetchError} >
    You don't have authorization for the required action!</Modal>
    const logOutError = <Modal show={this.state.logOutError}>
    Your token has expired, please sign in again!</Modal>

     return (
      <div className="app" >
        {logOutError}
        {unauthorizedFetch}
         
        <Router basename="/">
       
          <Header
            expiredToken={this.expiredToken} 
            signOutHandler={this.signOutHandler}
            modalHandler={this.hideModalHanlder}
            stateProps={this.state}
            modesHandler={this.modesHandler}
          />  
            
          <Switch>
            <Route exact path="/"> 
              {this.state.currentUser ? <Redirect to="/home" /> :
               <StartingPage
               postUserAuth={this.postUserAuth}
               stateProps={this.state}
               modal={this.hideModalHanlder}
               setCredentialsHandler={this.setCredentialsHandler}/>}
            </Route>

            <Route path="/home">
              {this.state.currentUser ? 
              <HomePage stateProps={this.state}/> : null} 
            </Route>

            {this.state.currentUser ?
              <Fragment>
                <RenderForAdmin stateProps={this.state}>
                  <Route path={["/admin", "/reports"]}>
                  {this.state.currentUser ? 
                   <SelectActivity 
                    modal={this.hideModalHanlder}
                    key={this.activityHandler}
                    stateProps={this.state}
                    onClick={this.activityHandler}
                    refreshReports={this.refreshReports}
                    backButton={this.backButtonHandler}/>
                    : <StartingPage /> } 
                  </Route>
               </RenderForAdmin> 

                <RenderForOperator stateProps={this.state}>
                  <Route path="/inputs">
                    {this.state.currentUser ? 
                    <SelectActivity 
                      modal={this.hideModalHanlder}
                      key={this.activityHandler}
                      stateProps={this.state}
                      onClick={this.activityHandler} 
                      backButton={this.backButtonHandler}/>
                      : <StartingPage /> }
                  </Route> 
                </RenderForOperator>  

               
                {this.state.purReq?.map((keys, id) => {
                 const approvedChoice = "Approved"
                 const declinedChoice = "Declined"
                  return <RenderForManager key={id+keys.id} stateProps={this.state}>          
                  <Route key={id+keys.id} path={`/purRequest/${approvedChoice}/${keys?.id}`}>
                    <RequestApprovals
                      purRequest={this.state.purReq}
                      decisionOnPurchase={approvedChoice}
                      id={keys.id}
                      modal={this.hideModalHanlder}
                      stateProps={this.state}/> 
                  </Route> 
                   
                  <Route key={id} path={`/purRequest/${declinedChoice}/${keys?.id}`}>
                    <RequestApprovals
                      purRequest={this.state.purReq}
                      decisionOnPurchase={declinedChoice}
                      id={keys.id}
                      modal={this.hideModalHanlder}
                      stateProps={this.state} /> 
                  </Route>
                  </RenderForManager> })
                } 
                
              </Fragment> : null } 
          </Switch>
        <Footer />
          
        </Router>
     </div>    
    );
  }
}

export default App;
