/*
    Full Stack React and REST API
    NotFound.js
*/

// import dependencies

import React from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';

// render 'not found' page when a user attempts to navigate to a non-existent route

const NotFound = (props) => {
    return (
    <div>
        <Header user={props.user}/>
        <hr/>
        <div className="bounds">
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
            <br/>
            <Link to="/">Back to courses</Link>
        </div>
    </div>
    )
}

export default NotFound;