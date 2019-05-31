/*
  Full Stack React and REST API
  Header.js
*/

// import dependencies

import React from 'react';
import {Link} from 'react-router-dom';

// header component which takes the user's name as props and displays it after sign-in

const Header = (props) => {
    return(
    <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav><span>{props.user ? "Welcome" : "Sign in to create or update courses:"} {props.user ? props.user + "!" : ""}</span><Link className="signout" to="/signout" hidden={props.user ? false : true}>Sign Out</Link><Link className="signin" to="/signin" hidden={props.user ? true : false}>Sign In</Link></nav>
        </div>
    </div>
    )
}

export default Header;