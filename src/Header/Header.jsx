import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

import "./Header.css"
import Logo from "../Assets/Logo.jpg";

import { RenderForAdmin, RenderForOperator } from '../RoleBasedAccessControl/RoleBasedAccessControl';

const Header = ({ stateProps, inputMode, outputMode, adminMode, homeMode, 
                  modalHandler, signOutHandler, expiredToken, modesHandler }) => {
  
  const signOutAndModalOff = () => {
    modalHandler()
    signOutHandler()
  }

 const [ toggle, setToggle ] = useState(false)

 const toggleHandler = () => {
  setToggle(!toggle)
  }

  return (
    <nav className="nav-bar">
        
      {stateProps.currentUser ?  
        <NavLink to="/home" onClick={(e) => {modesHandler(parseInt(e.target.id)); expiredToken()}} > 
        <img className="picture" src={Logo}  id={1}
        alt="Logo_image" width="100px" height="80px" >
        </img></NavLink> : 
        <img className="picture" src={Logo} 
        alt="Logo_image" width="100px" height="80px">
        </img>}

      <h2 className={stateProps.logOutError ? "time-out-your-company"  : "your-company"}>Your Company Name</h2>
      <div className="menu-wrap">
        {stateProps.currentUser ?  
          <input type="checkbox" className="toggler" checked={toggle} onChange={toggleHandler}/> : null }
        {stateProps.currentUser ?  <div className="hamburger"><div></div></div> : null }
        <div className={stateProps.logOutError ? "time-out-head-menu"  : "head-menu"}>
          <div>{stateProps.currentUser ?  <div className="cherry-join"></div> : null}
            <ul className="ul-bar">

              {stateProps.currentUser ?  
                <RenderForAdmin stateProps={stateProps}>
                  <li className="list-item">
                      <NavLink className="link-admin" id={2} 
                        activeClassName="active-style-admin"
                        onClick={(e) => {modesHandler(parseInt(e.target.id)); expiredToken(); setToggle(false)}}
                        to="/admin">
                          Admin
                      </NavLink> 
                    </li> 
                </RenderForAdmin> : null
              }

              {stateProps.currentUser ?
                <>
                  <RenderForOperator stateProps={stateProps}>
                    <li className="list-item">
                      <NavLink className="link" id={3}
                          activeClassName="active-style"  
                          onClick={(e) => {modesHandler(parseInt(e.target.parentElement.id)); 
                            expiredToken(); setToggle(false)}}
                          to="/inputs"> 
                            <div className="cherry cherry1" >Input Forms </div>
                      </NavLink>
                    </li>
                  </RenderForOperator>
                    
                  <RenderForAdmin stateProps={stateProps}>
                    <li className="list-item">
                      <NavLink className="link"  
                        activeClassName="active-style" id={4} 
                        onClick={(e) => {modesHandler(parseInt(e.target.parentElement.id)); 
                          expiredToken(); setToggle(false)}}
                        to="/reports">
                          <div className="cherry cherry2">Reports</div>
                        </NavLink> 
                    </li> 
                  </RenderForAdmin>
                </> : null
              }

              {stateProps.currentUser || stateProps.logOutError ? 
                <li className="list-item">     
                  <NavLink className="sign-out-link"
                    to="/" onClick={() => {signOutAndModalOff(); setToggle(false)}}>
                     <i className="fas fa-sign-out-alt"></i>SIGN OUT
                  </NavLink> 
                </li> : null 
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;
