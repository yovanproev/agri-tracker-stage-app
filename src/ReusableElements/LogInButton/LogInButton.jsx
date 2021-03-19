
import React from 'react';

import './LogInButton.css';

const LogInButton = ({ children, isGoogleSignIn, ...otherProps }) => (
  <button
    className={`${isGoogleSignIn ? 'google-sign-in' : ''} login-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default LogInButton;