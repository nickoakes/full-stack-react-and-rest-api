import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

class UserSignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      signInLinkHidden: true
    }
  }

  handleChange = e => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState( prevState => {
       return { 
                ...prevState, [name]: value
                  }
    }
    );
}

createUser = () => {
  axios.post('http://localhost:5000/api/users', {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    emailAddress: this.state.emailAddress,
    password: this.state.password
  })
  .then(res => {
    if(res.status > 200 && res.status < 400) {
      this.setState(prevState => {
        return {
          ...prevState,
          userCreated: 'Thanks for signing up!',
          errors: ""
        }
      });
    }  
  })
    .catch(error => {
      this.setState(prevState => {
        return {
          ...prevState,
          errors: error.response.data.errors
        }
      });
    })
};

    render() {
        return(
    <div>
      <Header />
      <hr/>
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <ul>
            {this.state.errors ? this.state.errors.map(error => <li>{error}</li>) : ""}
            {this.state.userCreated ? this.state.userCreated : ""}
          </ul>
          {this.state.userCreated ? <Link to="/signin">Sign In</Link> : ""}
          <div>
            <form method="POST" action="http://localhost:5000/api/users" onChange={this.handleChange}>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" /></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                  /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="button" onClick={this.createUser}>Sign Up</button><Link className="button button-secondary" to='/'>Cancel</Link></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    </div>
        )
    }
}

export default withRouter(UserSignUp);