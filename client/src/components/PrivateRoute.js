/*
  Full Stack React and REST API
  PrivateRoute.js
*/

// import dependencies

import React from 'react';
import {Redirect, Route} from 'react-router-dom';

// conditionally route to the location requested if the user is signed in, or to the sign in page if they are not

const PrivateRoute  = ({ component: Component, authenticatedUser, user, email, password, userId, ...rest }) => {
        return (
          <Route
            {...rest}
            render={props =>
              authenticatedUser ? (
                <Component {...props} user={user} email={email} password={password} userId={userId}/>
              ) : (
                <Redirect
                  to={{
                    pathname: "/signin",
                    state: {from: props.location}
                  }}
                />
              )
            }
          />
        );
      }

export default PrivateRoute;