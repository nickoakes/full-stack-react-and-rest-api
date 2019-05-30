import React from 'react';
import {Redirect, Route} from 'react-router-dom';

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