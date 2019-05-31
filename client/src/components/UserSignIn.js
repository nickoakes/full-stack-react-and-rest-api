/*
  Full Stack React and REST API
  UserSignIn.js
*/

// import dependencies

import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import Header from './Header';

// 'user sign in' component

class UserSignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emailAddress: [],
      password: []
    };
  }

// update state when the user enters an email address

  handleEmail = (event) => {
    this.setState({emailAddress: event.target.value})
  }

// update state when the user enters a password

  handlePassword = (event) => {
    this.setState({password: event.target.value})
  }

    render() {
        return(
    <div>
      {this.props.user ? <Redirect to={this.props.location.state ? this.props.location.state.from.pathname : "/"} /> : ""}
      <Header user={this.props.user}/>
      <hr/>
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          {this.props.message ? this.props.message : ""}
          <div>
            <form>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange = {this.handleEmail}/>
              </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handlePassword} />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="button" onClick={() => this.props.signIn(this.state.emailAddress, this.state.password)}>Sign In</button>
                <Link className="button button-secondary" to='/'>Cancel</Link>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>}
    </div>
        )
    }
}

export default withRouter(UserSignIn)