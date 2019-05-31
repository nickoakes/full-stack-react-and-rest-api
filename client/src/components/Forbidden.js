import React from 'react';
import Header from './Header';

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