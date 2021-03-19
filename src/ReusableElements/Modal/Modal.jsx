import React from 'react';

import './Modal.css';

const Modal = (props) => {
    
    return (
        <div onClick={props.hide}
            className="Modal"
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                display: props.show ? 'block' : 'none'
            }}>
            {props.children}
        </div>
    )
}

export default Modal;