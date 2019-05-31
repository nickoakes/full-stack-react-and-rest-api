/*
    Full Stack React and REST API
    UserSignOut.js
*/

// import dependencies

import React from 'react';
import {Redirect} from 'react-router-dom';

// sign the user out using the method passed via props from App.js, and then redirect to '/'

const UserSignOut = (props) => {
    props.signOut();
    return(
        <Redirect to={{pathname: "/"}} />
    )
};

export default UserSignOut;