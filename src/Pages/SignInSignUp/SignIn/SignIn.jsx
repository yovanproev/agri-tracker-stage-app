import React, { Component } from 'react';

import FormInput from '../FormInput/FormInput';
import LogInButton from '../../../ReusableElements/LogInButton/LogInButton';
import Modal from "../../../ReusableElements/Modal/Modal"
import LineSpinner from "../../../ReusableElements/Spinners/Spinner2"
import { auth, 
  // signInWithGoogle 
} from '../../../Firebase/Firebase.utils.js';

import './SignIn.css';
import axios from 'axios';

class SignIn extends Component {
  
  state = {
      email: '',
      password: '',
      modal: false,
  };
   
  successfulSignIn = () => {
    const authData = {
      email: this.state.email,
      password: this.state.password,
      returnSecureToken: true
    }
    const urlDev = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAK38e0I2ui4E_FDQAAi6CbtQQQ0jmaPzI"
    
    axios.post(urlDev, authData)
    .then(response => {
      // console.log(response)
      const tokenId = response.data.idToken
      const email = response.data.email
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
      
      document.cookie = `tokenId=${tokenId}`
      document.cookie = `email=${email}`
      document.cookie = `expirationDate=${expirationDate}`
      
      this.props.setCredentialsHandler()
      this.props.postUserAuth()
    })
  }

    handleSubmit = async event => {
    event.preventDefault();
    this.successfulSignIn()
    
    const { email, password} = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      
      this.setState({ 
        email: '', 
        password: '', 
        modal: true});
      } catch (error) {
        this.setState({ 
        modal: true,
        message: error.message,
        email: '', 
        password: '' 
      })
    }      
  };
  
  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  hideModalHanlder = () => {
    this.setState({
      modal: false,
      passwordReset: false
    })
  }
  
  resetPassword = () => {
  auth.sendPasswordResetEmail(this.state.email).then(function() {
   
  }).catch(function(error) {
    console.log(error)
  });
  this.setState({passwordReset: true})
}
  render() {
    
    const errorModal = 
      <Modal 
        show={this.state.modal} 
        hide={this.hideModalHanlder}
      >{this.state.message ? this.state.message : <LineSpinner />}</Modal>
      // console.log(this.state)
    return (
      <div className='sign-in'>
        {errorModal}
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          
          <div className='buttons'>
          <LogInButton type='submit'> Sign in </LogInButton> 
          </div>

        </form>
        <span style={{marginTop: "-50px", marginLeft: "170px"}}>
          {/* <LogInButton onClick={signInWithGoogle} isGoogleSignIn>
                Sign in with Google
          </LogInButton> */}
        </span>
        <div style={{marginTop: "60px"}}>
          <p>Forgot your password? Just type your email in the sign in section and press the Reset password button</p>
              <button className="btn btn-danger"  
              onClick={this.resetPassword} type='submit'> Reset password </button> 
              {<Modal show={this.state.passwordReset} hide={this.hideModalHanlder}>
                An email was sent to your account to reset your password.</Modal>}
            </div>
      </div>
    );
  }
}

export default SignIn;