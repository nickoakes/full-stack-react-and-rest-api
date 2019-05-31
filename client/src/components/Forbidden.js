/*
    Full Stack React and REST API
    Forbidden.js
*/

// import dependencies

import React from 'react';
import Header from './Header';

// render static page when a user attempts to navigate to a route for which they are not authenticated

const Forbidden = (props) => {
    return (
    <div>
        <Header user={props.user}/>
        <hr/>
        <div className="bounds">
            <h1>Forbidden</h1>
            <p>Oh oh! You can't access this page.</p>
        </div>
    </div>
    )
}

export default Forbidden;